"use client";

import { useId, useState, type FormEvent } from "react";
import { ChevronDown } from "lucide-react";
import { DISCVAULT } from "@/lib/constants";

type Status = "idle" | "submitting" | "success" | "error";

const REASONS = [
  "I'm a player",
  "I'm a retailer",
  "I'm a disc brand",
  "I need support",
  "I want to partner",
  "I found incorrect disc data",
] as const;

/**
 * Partner / support form embedded in the closing CTA.
 *
 * Submission is stubbed until a server action + Resend are wired up —
 * the UX (loading state, success screen, error fallback to email) is
 * production-shaped so swapping in a real handler is a one-line change.
 */
export function PartnerForm() {
  const [status, setStatus] = useState<Status>("idle");
  const nameId = useId();
  const emailId = useId();
  const reasonId = useId();
  const messageId = useId();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");

    try {
      await new Promise((r) => setTimeout(r, 650));
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-[18px] bg-surface p-8 text-center shadow-[0_12px_40px_rgba(0,0,0,0.08)] ring-1 ring-ink/5"
      >
        <div
          className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent-pale text-accent"
          aria-hidden="true"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3
          className="mb-2 font-[family-name:var(--font-display)] font-black text-ink"
          style={{ fontSize: "clamp(20px, 2vw, 26px)", lineHeight: 1.2 }}
        >
          Message received
        </h3>
        <p className="text-[14px] leading-[1.6] text-muted">
          Thanks — the DiscVault team will get back to you soon. Need it
          sooner? Email{" "}
          <a
            href={DISCVAULT.supportEmailHref}
            className="font-semibold text-ink underline decoration-accent/70 underline-offset-4 hover:decoration-accent"
          >
            {DISCVAULT.supportEmail}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      aria-labelledby="partner-form-heading"
      className="rounded-[18px] bg-surface p-6 shadow-[0_12px_40px_rgba(0,0,0,0.08)] ring-1 ring-ink/5 sm:p-8"
    >
      <p
        className="mb-2 text-[11px] font-semibold uppercase text-accent"
        style={{ letterSpacing: "0.18em" }}
      >
        Partner &amp; Support
      </p>
      <h3
        id="partner-form-heading"
        className="mb-5 font-[family-name:var(--font-display)] font-black text-ink"
        style={{ fontSize: "clamp(20px, 2vw, 26px)", lineHeight: 1.15 }}
      >
        Tell us how we can help
      </h3>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field id={nameId} label="Name" name="name" type="text" autoComplete="name" required />
        <Field id={emailId} label="Email" name="email" type="email" autoComplete="email" required />
        <div className="sm:col-span-2">
          <label
            htmlFor={reasonId}
            className="mb-[6px] block text-[11px] font-semibold uppercase text-ink-soft/60"
            style={{ letterSpacing: "0.14em" }}
          >
            Reason
          </label>
          <div className="relative">
            <select
              id={reasonId}
              name="reason"
              defaultValue=""
              required
              className="block w-full appearance-none rounded-lg border border-border bg-paper px-4 py-[11px] pr-10 text-[14px] text-ink transition-[border-color,box-shadow] duration-150 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25"
            >
              <option value="" disabled>
                Select a reason…
              </option>
              {REASONS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-soft/60"
              strokeWidth={2}
              aria-hidden="true"
            />
          </div>
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor={messageId}
            className="mb-[6px] block text-[11px] font-semibold uppercase text-ink-soft/60"
            style={{ letterSpacing: "0.14em" }}
          >
            Message
          </label>
          <textarea
            id={messageId}
            name="message"
            rows={3}
            placeholder="Tell us a bit more…"
            className="block w-full resize-y rounded-lg border border-border bg-paper px-4 py-[11px] text-[14px] text-ink placeholder:text-ink/30 transition-[border-color,box-shadow] duration-150 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-ink px-7 py-[14px] text-[14px] font-bold text-paper transition-[background,transform] duration-200 hover:-translate-y-px hover:bg-ink-soft disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 sm:w-auto"
      >
        {status === "submitting" ? (
          <>
            <Spinner />
            <span className="ml-2">Sending…</span>
          </>
        ) : (
          "Send Message"
        )}
      </button>

      {status === "error" && (
        <p role="alert" className="mt-3 text-[13px] text-ink-soft">
          Something went wrong. Please email us at{" "}
          <a
            href={DISCVAULT.supportEmailHref}
            className="font-semibold text-ink underline decoration-accent/70 underline-offset-4 hover:decoration-accent"
          >
            {DISCVAULT.supportEmail}
          </a>
          .
        </p>
      )}

      <p className="mt-3 text-[11px] text-muted-light">
        No spam — we only use your info to reply.
      </p>
    </form>
  );
}

type FieldProps = {
  id: string;
  label: string;
  name: string;
  type: "text" | "email";
  autoComplete: string;
  required?: boolean;
};

function Field({ id, label, name, type, autoComplete, required }: FieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-[6px] block text-[11px] font-semibold uppercase text-ink-soft/60"
        style={{ letterSpacing: "0.14em" }}
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        className="block w-full rounded-lg border border-border bg-paper px-4 py-[11px] text-[14px] text-ink placeholder:text-ink/30 transition-[border-color,box-shadow] duration-150 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25"
      />
    </div>
  );
}

function Spinner() {
  return (
    <svg
      className="h-4 w-4 animate-spin text-paper"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
      <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
