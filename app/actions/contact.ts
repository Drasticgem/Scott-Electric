"use server";

import nodemailer from "nodemailer";
import { DISCVAULT } from "@/lib/constants";
import { contactFormSchema } from "@/lib/schemas/contact";

type ActionResult = { ok: true } | { ok: false; error: string };

/**
 * Handles the Partner & Support form submission (see PartnerForm), sending
 * through the client's existing Microsoft 365 mailbox over SMTP — no
 * third-party email service, since M365 is already paid for.
 *
 * Re-validates with the same Zod schema the client uses — client-side
 * validation is a UX nicety, not a security boundary, so untrusted input is
 * never trusted just because the client's resolver already checked it.
 */
export async function submitContactForm(formData: FormData): Promise<ActionResult> {
  const parsed = contactFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    reason: formData.get("reason"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return { ok: false, error: "Please check the form and try again." };
  }

  const smtpUser = process.env.SMTP_EMAIL;
  const smtpPassword = process.env.SMTP_PASSWORD;
  if (!smtpUser || !smtpPassword) {
    console.error("submitContactForm: SMTP_EMAIL or SMTP_PASSWORD is not set");
    return { ok: false, error: "Something went wrong. Please try again later." };
  }

  const { name, email, reason, message } = parsed.data;

  const transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false, // STARTTLS, not implicit TLS — Office 365's SMTP AUTH expects this
    auth: { user: smtpUser, pass: smtpPassword },
  });

  try {
    await transporter.sendMail({
      from: `DiscVault Website <${smtpUser}>`,
      to: DISCVAULT.supportEmail,
      replyTo: email,
      subject: `New contact form submission — ${reason}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Reason: ${reason}`,
        "",
        message?.length ? message : "(no message)",
      ].join("\n"),
    });
  } catch (err) {
    console.error("submitContactForm: SMTP send failed", err);
    return { ok: false, error: "Something went wrong. Please try again later." };
  }

  return { ok: true };
}
