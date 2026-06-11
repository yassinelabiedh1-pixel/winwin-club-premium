"use client";

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

const helpTopics = [
  { value: "tour", label: "Book a tour" },
  { value: "membership", label: "Membership & pricing" },
  { value: "events", label: "Events & community" },
  { value: "partnership", label: "Partnership inquiry" },
  { value: "other", label: "Something else" },
];

const fieldClassName =
  "h-12 rounded-lg border-white/[0.08] bg-[#1A1F45] px-4 text-base text-white placeholder:text-white/30 focus-visible:border-white/20 focus-visible:ring-white/10 sm:text-[15px]";

const selectContentClassName =
  "rounded-xl border border-white/10 bg-[#12162E]/95 p-1.5 text-white shadow-[0_24px_60px_-16px_rgba(0,0,0,0.65)] ring-1 ring-white/[0.06] backdrop-blur-xl";

const selectItemClassName =
  "min-h-10 rounded-lg px-3 py-2.5 text-[15px] text-white/75 transition-colors outline-none data-highlighted:bg-white/10 data-highlighted:text-white focus:bg-white/10 focus:text-white data-selected:bg-white/[0.07] data-selected:text-white [&_svg]:text-white";

export function ContactForm() {
  return (
    <form className="w-full min-w-0" onSubmit={(event) => event.preventDefault()}>
      <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-[13px] font-normal text-white/50">
            Name
          </Label>
          <Input
            id="name"
            name="name"
            placeholder="Jane Smith"
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
            placeholder="jane@framer.com"
            className={fieldClassName}
          />
        </div>
      </div>

      <div className="mt-5 space-y-2">
        <Label htmlFor="topic" className="text-[13px] font-normal text-white/50">
          What can we help you with?
        </Label>
        <Select>
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
          placeholder="Your message..."
          rows={5}
          className="min-h-[120px] resize-none rounded-lg border-white/[0.08] bg-[#1A1F45] px-4 py-3 text-base text-white placeholder:text-white/30 focus-visible:border-white/20 focus-visible:ring-white/10 sm:min-h-[132px] sm:text-[15px]"
        />
      </div>

      <Button
        type="submit"
        className="mt-6 h-[52px] w-full rounded-full bg-white text-[15px] font-medium text-[#0A0E27] hover:bg-white/90"
      >
        Send your message
      </Button>

      <p className="mt-5 text-center text-[12px] leading-relaxed text-white/35">
        We usually reply within a few hours. No bots — just real humans.
      </p>
    </form>
  );
}
