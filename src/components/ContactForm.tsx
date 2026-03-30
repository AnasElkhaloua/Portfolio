"use client";

import { Column, Row, Heading, Text, Button } from "@once-ui-system/core";
import { useState } from "react";

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        setSubmitMessage("Thank you! Your message has been sent successfully.");
        // Clear form
        setFormData({ name: "", email: "", phone: "", message: "" });
        // Clear status after 3 seconds
        setTimeout(() => setSubmitStatus("idle"), 3000);
      } else {
        setSubmitStatus("error");
        setSubmitMessage(data.error || "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
      setSubmitMessage("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "16px 18px",
    border: "1px solid var(--neutral-border-medium)",
    borderRadius: "12px",
    fontFamily: "inherit",
    fontSize: "inherit",
    color: "inherit",
    backgroundColor: "var(--data-surface-default)",
    transition: "border-color 0.2s, background-color 0.2s",
  };

  const formContainerStyle: React.CSSProperties = {
    border: "1px solid var(--data-border-neutral-medium)",
    borderRadius: "var(--static-border-radius-m)",
    padding: "var(--static-space-l)",
    backgroundColor: "var(--data-surface-weak-on)",
  };

  return (
    <Column as="section" fillWidth gap="l" maxWidth="m" horizontal="center" align="center">
      {/* Heading */}
      <Column gap="4" horizontal="center" align="center" fillWidth>
        <Heading as="h2" variant="display-strong-m" align="center">
          LET'S WORK
        </Heading>
        <Text variant="display-default-s" onBackground="neutral-weak" align="center">
          TOGETHER
        </Text>
      </Column>

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ width: "100%", ...formContainerStyle }}>
        <Column gap="m" fillWidth>
          {/* Name and Email - Side by side on desktop, stacked on mobile */}
          <Row
            fillWidth
            gap="l"
            s={{ direction: "column", gap: "l" }}
          >
            <Column flex={1} fillWidth horizontal="start" align="start">
              <label htmlFor="name" style={{ marginBottom: "var(--static-space-2)", display: "block", textAlign: "left" }}>
                <Text variant="body-default-s">Name</Text>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your name"
                style={inputStyle}
              />
            </Column>
            <Column flex={1} fillWidth horizontal="start" align="start">
              <label htmlFor="email" style={{ marginBottom: "var(--static-space-2)", display: "block", textAlign: "left" }}>
                <Text variant="body-default-s">Email</Text>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
                style={inputStyle}
              />
            </Column>
          </Row>

          {/* Phone Number - Full width */}
          <Column fillWidth horizontal="start" align="start">
            <label htmlFor="phone" style={{ marginBottom: "var(--static-space-2)", display: "block", textAlign: "left" }}>
              <Text variant="body-default-s">Phone Number</Text>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+212 6XX XXX XXX"
              style={inputStyle}
            />
          </Column>

          {/* Message - Full width */}
          <Column fillWidth horizontal="start" align="start">
            <label htmlFor="message" style={{ marginBottom: "var(--static-space-2)", display: "block", textAlign: "left" }}>
              <Text variant="body-default-s">Message</Text>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Tell me about your project..."
              style={{
                ...inputStyle,
                minHeight: "120px",
                resize: "vertical",
              }}
            />
          </Column>

          {/* Submit Button - Full width */}
          {submitStatus !== "idle" && (
            <Text
              variant="body-default-s"
              style={{
                color: submitStatus === "success" ? "var(--intent-success-strong)" : "var(--intent-danger-strong)",
                textAlign: "center",
              }}
            >
              {submitMessage}
            </Text>
          )}
          <Button
            type="submit"
            label={isSubmitting ? "Sending..." : "Send Message"}
            variant="primary"
            disabled={isSubmitting}
            fillWidth
          />
        </Column>
      </form>
    </Column>
  );
};
