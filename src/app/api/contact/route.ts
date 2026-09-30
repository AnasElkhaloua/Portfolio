import { NextResponse } from "next/server";

const MAX_REQUEST_BYTES = 16_384;
const FIELD_LIMITS = {
  name: 100,
  email: 254,
  phone: 40,
  message: 5_000,
} as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function errorResponse(error: string, status: number) {
  return NextResponse.json({ error }, { status });
}

function normalizeSingleLine(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });
}

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return errorResponse("Content-Type must be application/json", 415);
  }

  const contentLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(contentLength) && contentLength > MAX_REQUEST_BYTES) {
    return errorResponse("Request is too large", 413);
  }

  let body: unknown;
  try {
    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > MAX_REQUEST_BYTES) {
      return errorResponse("Request is too large", 413);
    }
    body = JSON.parse(rawBody);
  } catch {
    return errorResponse("Invalid JSON request", 400);
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return errorResponse("Invalid request body", 400);
  }

  const fields = body as Record<string, unknown>;
  if (
    typeof fields.name !== "string" ||
    typeof fields.email !== "string" ||
    typeof fields.message !== "string" ||
    (fields.phone !== undefined && typeof fields.phone !== "string")
  ) {
    return errorResponse("Name, email, and message must be text fields", 400);
  }

  const name = normalizeSingleLine(fields.name);
  const email = normalizeSingleLine(fields.email).toLowerCase();
  const phone = normalizeSingleLine(fields.phone ?? "");
  const message = fields.message.trim().replace(/\r\n?/g, "\n");

  if (!name || !email || !message) {
    return errorResponse("Name, email, and message are required", 400);
  }

  if (
    name.length > FIELD_LIMITS.name ||
    email.length > FIELD_LIMITS.email ||
    phone.length > FIELD_LIMITS.phone ||
    message.length > FIELD_LIMITS.message
  ) {
    return errorResponse("One or more fields exceed the allowed length", 400);
  }

  if (!EMAIL_PATTERN.test(email)) {
    return errorResponse("Enter a valid email address", 400);
  }

  const contactEmail =
    process.env.CONTACT_EMAIL ||
    process.env.NEXT_PUBLIC_CONTACT_EMAIL ||
    "anaselkhaloua06@gmail.com";
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    console.error("Contact form is unavailable: RESEND_API_KEY is not configured");
    return errorResponse("Contact form is temporarily unavailable", 503);
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
        to: contactEmail,
        replyTo: email,
        subject: `New Contact Form Submission from ${name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(phone || "Not provided")}</p>
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
        `,
      }),
    });

    if (!response.ok) {
      console.error("Resend rejected a contact submission", {
        status: response.status,
        response: await response.text(),
      });
      return errorResponse("Unable to send your message right now", 502);
    }

    return NextResponse.json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Contact form delivery failed", error);
    return errorResponse("Unable to send your message right now", 502);
  }
}
