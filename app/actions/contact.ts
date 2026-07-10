"use server";

import { Resend } from "resend";
import { DISCVAULT } from "@/lib/constants";
import { contactFormSchema } from "@/lib/schemas/contact";

type ActionResult = { ok: true } | { ok: false; error: string };

/**
 * Handles the Partner & Support form submission (see PartnerForm). Re-validates
 * with the same Zod schema the client uses — client-side validation is a UX
 * nicety, not a security boundary, so untrusted input is never trusted just
 * because the client's `required`/resolver already checked it.
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

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("submitContactForm: RESEND_API_KEY is not set");
    return { ok: false, error: "Something went wrong. Please try again later." };
  }

  const { name, email, reason, message } = parsed.data;
  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: `DiscVault Website <notifications@${DISCVAULT.emailDomain}>`,
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

  if (error) {
    console.error("submitContactForm: Resend error", error);
    return { ok: false, error: "Something went wrong. Please try again later." };
  }

  return { ok: true };
}
