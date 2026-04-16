"use client";

import { useId, useState, type FormEvent } from "react";
import { BUSINESS } from "@/lib/constants";

type Status = "idle" | "submitting" | "success" | "error";

const SERVICES = [
  "Electrical",
  "A/C & Heating",
  "Telecom",
  "Custom Woodworking",
  "Not sure yet",
] as const;

/**
 * Lightweight on-brand estimate form for the closing CTA.
 * Offwhite card on the gold CTA band; navy typography; gold submit.
 *
 * Submission is stubbed until a server action + Resend are wired up —
 * the UX (loading state, success screen, error fallback to phone) is
 * production-shaped so swapping in a real handler is a one-line change.
 */
export function EstimateForm() {
  const [status, setStatus] = useState<Status>("idle");
  const nameId = useId();
  const phoneId = useId();
  const emailId = useId();
  const serviceId = useId();
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
        className="rounded-[18px] bg-offwhite p-8 text-center shadow-[0_12px_40px_rgba(10,24,48,0.18)] ring-1 ring-navy/5"
      >
        <div
          className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gold/20 text-gold-dark"
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
          className="mb-2 font-[family-name:var(--font-display)] font-black text-navy"
          style={{ fontSize: "clamp(20px, 2vw, 26px)", lineHeight: 1.2 }}
        >
          Request received
        </h3>
        <p className="text-[14px] leading-[1.6] text-navy/65">
          Thanks — a Scott team member will reach out within one business day.
          Need it sooner? Call{" "}
          <a
            href={BUSINESS.phoneHref}
            className="font-semibold text-navy underline decoration-gold/70 underline-offset-4 hover:decoration-gold"
          >
            {BUSINESS.phoneDisplay}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate={false}
      aria-labelledby="estimate-form-heading"
      className="rounded-[18px] bg-offwhite p-6 shadow-[0_12px_40px_rgba(10,24,48,0.18)] ring-1 ring-navy/5 sm:p-8"
    >
      <p
        className="mb-2 text-[11px] font-semibold uppercase text-gold-dark"
        style={{ letterSpacing: "0.18em" }}
      >
        Free Estimate
      </p>
      <h3
        id="estimate-form-heading"
        className="mb-5 font-[family-name:var(--font-display)] font-black text-navy"
        style={{ fontSize: "clamp(20px, 2vw, 26px)", lineHeight: 1.15 }}
      >
        Tell us about your project
      </h3>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field
          id={nameId}
          label="Name"
          name="name"
          type="text"
          autoComplete="name"
          required
        />
        <Field
          id={phoneId}
          label="Phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          required
        />
        <div className="sm:col-span-2">
          <Field
            id={emailId}
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor={serviceId}
            className="mb-[6px] block text-[11px] font-semibold uppercase text-navy/60"
            style={{ letterSpacing: "0.14em" }}
          >
            Service
          </label>
          <select
            id={serviceId}
            name="service"
            defaultValue=""
            required
            className="block w-full appearance-none rounded-lg border border-navy/15 bg-white px-4 py-[11px] pr-10 text-[14px] text-navy transition-[border-color,box-shadow] duration-150 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/35"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%230F2040' stroke-width='1.75' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 14px center",
            }}
          >
            <option value="" disabled>
              Select a service…
            </option>
            {SERVICES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor={messageId}
            className="mb-[6px] block text-[11px] font-semibold uppercase text-navy/60"
            style={{ letterSpacing: "0.14em" }}
          >
            How can we help?
          </label>
          <textarea
            id={messageId}
            name="message"
            rows={3}
            placeholder="Briefly describe the job, timeline, or address…"
            className="block w-full resize-y rounded-lg border border-navy/15 bg-white px-4 py-[11px] text-[14px] text-navy placeholder:text-navy/35 transition-[border-color,box-shadow] duration-150 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/35"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-navy px-7 py-[14px] text-[14px] font-bold text-white transition-[background,transform] duration-200 hover:-translate-y-px hover:bg-navy-mid disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 sm:w-auto"
        style={{ letterSpacing: "0.04em" }}
      >
        {status === "submitting" ? (
          <>
            <Spinner />
            <span className="ml-2">Sending…</span>
          </>
        ) : (
          "Request Free Estimate"
        )}
      </button>

      {status === "error" && (
        <p
          role="alert"
          className="mt-3 text-[13px] text-navy/70"
        >
          Something went wrong. Please call us at{" "}
          <a
            href={BUSINESS.phoneHref}
            className="font-semibold text-navy underline decoration-gold/70 underline-offset-4 hover:decoration-gold"
          >
            {BUSINESS.phoneDisplay}
          </a>
          .
        </p>
      )}

      <p className="mt-3 text-[11px] text-navy/45">
        No spam — we only use your info to reply about your estimate.
      </p>
    </form>
  );
}

type FieldProps = {
  id: string;
  label: string;
  name: string;
  type: "text" | "tel" | "email";
  autoComplete: string;
  required?: boolean;
};

function Field({ id, label, name, type, autoComplete, required }: FieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-[6px] block text-[11px] font-semibold uppercase text-navy/60"
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
        className="block w-full rounded-lg border border-navy/15 bg-white px-4 py-[11px] text-[14px] text-navy placeholder:text-navy/35 transition-[border-color,box-shadow] duration-150 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/35"
      />
    </div>
  );
}

function Spinner() {
  return (
    <svg
      className="h-4 w-4 animate-spin text-white"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeOpacity="0.25"
        strokeWidth="3"
      />
      <path
        d="M22 12a10 10 0 0 1-10 10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
