import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";

export const ROUTE_ACCESS_COOKIE = "routeAccess";
export const ROUTE_ACCESS_MAX_AGE = 60 * 60;

type RouteAccessPayload = {
  path: string;
  expiresAt: number;
};

function getSecret() {
  return process.env.PAGE_ACCESS_PASSWORD;
}

function sign(payload: string, secret: string) {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

export function passwordsMatch(candidate: string, expected: string) {
  const candidateDigest = createHmac("sha256", expected).update(candidate).digest();
  const expectedDigest = createHmac("sha256", expected).update(expected).digest();

  return timingSafeEqual(candidateDigest, expectedDigest);
}

export function createRouteAccessToken(path: string) {
  const secret = getSecret();
  if (!secret) return null;

  const payload = Buffer.from(
    JSON.stringify({
      path,
      expiresAt: Date.now() + ROUTE_ACCESS_MAX_AGE * 1000,
    } satisfies RouteAccessPayload),
  ).toString("base64url");

  return `${payload}.${sign(payload, secret)}`;
}

export function verifyRouteAccessToken(token: string | undefined, path: string) {
  const secret = getSecret();
  if (!token || !secret) return false;

  const separator = token.lastIndexOf(".");
  if (separator < 1) return false;

  const payload = token.slice(0, separator);
  const providedSignature = token.slice(separator + 1);
  const expectedSignature = sign(payload, secret);
  const providedBuffer = Buffer.from(providedSignature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (
    providedBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(providedBuffer, expectedBuffer)
  ) {
    return false;
  }

  try {
    const parsed = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8"),
    ) as Partial<RouteAccessPayload>;
    return (
      parsed.path === path && typeof parsed.expiresAt === "number" && parsed.expiresAt > Date.now()
    );
  } catch {
    return false;
  }
}
