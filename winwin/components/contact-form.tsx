"use client";

import Link from "next/link";

import { FormHoneypot } from "@/components/form-honeypot";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CLUB_WHATSAPP_URL } from "@/lib/site";
import { useFormSubmit } from "@/lib/use-form-submit";

const helpTopics = [
  { value: "Visit the club", label: "Visit the club" },
  { value: "Membership & pricing", label: "Membership & pricing" },
  { value: "Events & community", label: "Events & community" },
  { value: "Partnership inquiry", label: "Partnership inquiry" },
  { value: "Something else", label: "Something else" },
];

const fieldClassName =
  "h-12 rounded-lg border-white/[0.08] bg-[#1A1F45] px-4 text-[15px] text-white placeholder:text-white/30 focus-visible:border-white/20 focus-visible:ring-white/10";

const selectContentClassName =
  "rounded-xl border border-white/10 bg-[#12162E]/95 p-1.5 text-white shadow-[0_24px_60px_-16px_rgba(0,0,0,0.65)] ring-1 ring-white/[0.06] backdrop-blur-xl";

const selectItemClassName =
  "min-h-10 rounded-lg px-3 py-2.5 text-[15px] text-white/75 transition-colors outline-none data-highlighted:bg-white/10 data-highlighted:text-white focus:bg-white/10 focus:text-white data-selected:bg-white/[0.07] data-selected:text-white [&_svg]:text-white";

const errorMessages: Record<string, string> = {
  too_fast: "That was very quick. Please wait a few seconds and try again.",
  too_many_links:
    "Please use no more than 2 links in your message, and none in your name.",
  rate_limited:
    "You've sent several messages recently. Please try again later, or",
};

export function ContactForm() {
  const { status, errorCode, handleSubmit, reset } = useFormSubmit();

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex w-full flex-1 flex-col items-start justify-center rounded-lg border border-white/[0.08] bg-[#1A1F45] p-8"
      >
        <h2 className="text-2xl font-semibold tracking-tight">Message sent</h2>
        <p className="mt-2 text-[15px] text-white/60">
          Thanks for reaching out. We&apos;ll get back to you soon.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 text-sm font-semibold text-white underline underline-offset-4 hover:text-white/80"
        >
          Send another message
        </button>
      </div>
    );
  }

  const isSending = status === "sending";

  return (
    <form className="relative w-full" onSubmit={handleSubmit}>
      <FormHoneypot />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-[13px] font-normal text-white/50">
            Name
          </Label>
          <Input
            id="name"
            name="name"
            required
            maxLength={120}
            autoComplete="name"
            placeholder="Your name"
            className={fieldClassName}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-[13px] font-normal text-white/50">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            maxLength={200}
            autoComplete="email"
            placeholder="you@example.com"
            className={fieldClassName}
          />
        </div>
      </div>

      <div className="mt-5 space-y-2">
        <Label htmlFor="topic" className="text-[13px] font-normal text-white/50">
          What can we help you with?
        </Label>
        <Select name="topic">
          <SelectTrigger
            id="topic"
            className={`w-full ${fieldClassName} !h-12 min-h-12 py-0 data-[size=default]:!h-12 [&_svg]:text-white/45`}
          >
            <SelectValue placeholder="Select..." />
          </SelectTrigger>
          <SelectContent
            side="bottom"
            align="start"
            sideOffset={4}
            alignItemWithTrigger={false}
            className={selectContentClassName}
          >
            {helpTopics.map((topic) => (
              <SelectItem
                key={topic.value}
                value={topic.value}
                className={selectItemClassName}
              >
                {topic.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mt-5 space-y-2">
        <Label htmlFor="message" className="text-[13px] font-normal text-white/50">
          Message
        </Label>
        <Textarea
          id="message"
          name="message"
          required
          minLength={10}
          maxLength={5000}
          placeholder="Your message..."
          rows={5}
          className="min-h-[132px] resize-none rounded-lg border-white/[0.08] bg-[#1A1F45] px-4 py-3 text-[15px] text-white placeholder:text-white/30 focus-visible:border-white/20 focus-visible:ring-white/10"
        />
      </div>

      <Button
        type="submit"
        disabled={isSending}
        className="mt-6 h-[52px] w-full rounded-full bg-white text-[15px] font-medium text-[#0A0E27] hover:bg-white/90"
      >
        {isSending ? "Sending..." : "Send your message"}
      </Button>

      {status === "error" && (
        <p role="alert" className="mt-4 text-center text-sm text-white/80">
          {errorCode === "too_fast" || errorCode === "too_many_links" ? (
            errorMessages[errorCode]
          ) : (
            <>
              {errorCode === "rate_limited"
                ? errorMessages.rate_limited
                : "We couldn't send your message. Please try again, or"}{" "}
              <a
                href={CLUB_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold underline underline-offset-4"
              >
                message us on WhatsApp
              </a>
              .
            </>
          )}
        </p>
      )}

      <p className="mt-4 text-center text-xs text-white/40">
        By sending this message, you agree to our{" "}
        <Link href="/privacy" className="underline underline-offset-4">
          Privacy Policy
        </Link>
        .
      </p>
    </form>
  );
}
