"use client";

import { FormEvent, useState } from "react";
import { Button, Column, Heading, PasswordInput } from "@once-ui-system/core";

type PasswordProtectionProps = {
  path: string;
};

export function PasswordProtection({ path }: PasswordProtectionProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError(undefined);

    try {
      const response = await fetch("/api/authenticate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, path }),
      });

      if (!response.ok) {
        setError(response.status === 401 ? "Incorrect password" : "Unable to unlock this page");
        return;
      }

      window.location.reload();
    } catch {
      setError("Unable to unlock this page");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Column paddingY="128" maxWidth={24} gap="24" center>
      <Heading align="center" wrap="balance">
        This page is password protected
      </Heading>
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <Column fillWidth gap="8" horizontal="center">
          <PasswordInput
            id="password"
            label="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            errorMessage={error}
            disabled={isSubmitting}
          />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Checking..." : "Submit"}
          </Button>
        </Column>
      </form>
    </Column>
  );
}
