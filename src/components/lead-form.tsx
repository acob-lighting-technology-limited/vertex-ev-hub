"use client";

import { ArrowRight, Loader2, Lock, Mail, MessageCircle, Phone, Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useActionState, useState } from "react";
import { toast } from "sonner";
import { cn } from "@vertex/ui/lib/cn";
import { easeBlade } from "@vertex/ui/motion/easing";
import { submitLead } from "@/app/actions/lead";
import { Field, FieldError, FieldGroup, FieldLabel, FieldTitle } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { LeadState, LeadType } from "@/lib/leads";
import { formatPhone } from "@/lib/site";

type Method = "whatsapp" | "call" | "email";

const methods: { value: Method; label: string; icon: typeof Phone }[] = [
  { value: "whatsapp", label: "WhatsApp", icon: MessageCircle },
  { value: "call", label: "Call", icon: Phone },
  { value: "email", label: "Email", icon: Mail },
];
const siteTypes = ["Fuel station", "Mall / retail", "Hotel", "Office", "Estate", "Other"];
const fleetSizes = ["1–5 vehicles", "6–20", "21–50", "50+"];

const initial: LeadState = { status: "idle" };

/** Card-style single choice (shadcn ToggleGroup) backed by a hidden input so the form posts it. */
function ChoiceGroup({
  name,
  label,
  value,
  onChange,
  options,
  columns = "grid-cols-2 sm:grid-cols-3",
}: {
  name: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label?: string; icon?: typeof Phone }[];
  columns?: string;
}) {
  return (
    <Field>
      <FieldTitle>{label}</FieldTitle>
      <input type="hidden" name={name} value={value} />
      <ToggleGroup type="single" value={value} onValueChange={(v) => v && onChange(v)} aria-label={label} className={cn("grid w-full gap-2", columns)}>
        {options.map((o) => (
          <ToggleGroupItem
            key={o.value}
            value={o.value}
            className={cn(
              "h-auto min-h-12 flex-col gap-1.5 rounded-xl border border-line bg-surface-2/50 px-3 py-2.5 text-sm font-medium text-fg",
              "transition-[background-color,border-color,box-shadow,transform] duration-300 hover:border-line-strong active:scale-[0.98]",
              "data-[state=on]:border-accent data-[state=on]:bg-accent/12 data-[state=on]:shadow-[0_0_0_3px_var(--vx-glow)]",
            )}
          >
            {o.icon && <o.icon className="size-5 text-accent-text" aria-hidden />}
            <span className="text-center leading-tight whitespace-normal">{o.label ?? o.value}</span>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </Field>
  );
}

export function LeadForm({
  type,
  submitLabel,
  whatsappHref,
  phone,
  className,
}: {
  type: LeadType;
  submitLabel: string;
  whatsappHref?: string;
  phone?: string;
  className?: string;
}) {
  const [method, setMethod] = useState<Method>("whatsapp");
  const [siteType, setSiteType] = useState("");
  const [fleetSize, setFleetSize] = useState("");
  const [localPhone, setLocalPhone] = useState("");
  const [moreOpen, setMoreOpen] = useState(type === "contact");

  const [state, action, pending] = useActionState(async (prev: LeadState, fd: FormData) => {
    const result = await submitLead(prev, fd);
    if (result.status === "sent") toast.success("Sent", { description: "The Vertex EV Hub team will be in touch." });
    if (result.status === "error") toast.error("Couldn't send", { description: "Please try again, or message us on WhatsApp." });
    return result;
  }, initial);

  const err = state.status === "invalid" ? state.errors : {};
  const val = state.status === "invalid" ? state.values : {};
  const digits = localPhone.replace(/[^\d+]/g, "");
  const fullPhone = digits.startsWith("+") || digits.startsWith("234") ? digits : digits ? `+234${digits.replace(/^0/, "")}` : "";
  const id = (f: string) => `${type}-${f}`;

  if (state.status === "sent") {
    return (
      <motion.div
        role="status"
        initial={{ opacity: 0, scale: 0.96, filter: "blur(6px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.6, ease: easeBlade }}
        className={cn("rounded-2xl border border-line bg-surface p-8 text-center", className)}
      >
        <svg viewBox="0 0 52 52" className="mx-auto size-14" aria-hidden>
          <motion.circle cx="26" cy="26" r="24" fill="none" stroke="var(--vx-accent)" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, ease: easeBlade }} />
          <motion.path d="M15 27l7 7 15-16" fill="none" stroke="var(--vx-accent-text)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.45, delay: 0.45, ease: easeBlade }} />
        </svg>
        <p className="mt-5 font-display text-xl font-medium">Thank you — we&apos;ve got it.</p>
        <p className="mt-2 text-muted">The Vertex EV Hub team will be in touch.</p>
      </motion.div>
    );
  }

  return (
    <form action={action} noValidate className={cn("space-y-6", className)}>
      <input type="hidden" name="type" value={type} />
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Company <input name="company" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>

      <FieldGroup className="gap-5">
        {type === "host" && (
          <ChoiceGroup name="siteType" label="What kind of site?" value={siteType} onChange={setSiteType} options={siteTypes.map((s) => ({ value: s }))} />
        )}
        {type === "business" && (
          <ChoiceGroup name="fleetSize" label="How many vehicles?" value={fleetSize} onChange={setFleetSize} options={fleetSizes.map((s) => ({ value: s }))} columns="grid-cols-2 sm:grid-cols-4" />
        )}
        {(type === "host" || type === "business") && (
          <Field>
            <FieldLabel htmlFor={id("org")}>Organisation</FieldLabel>
            <Input id={id("org")} name="organisation" autoComplete="organization" placeholder="Company or property name" defaultValue={val.organisation} />
          </Field>
        )}

        <Field data-invalid={Boolean(err.name)}>
          <FieldLabel htmlFor={id("name")}>Your name</FieldLabel>
          <Input id={id("name")} name="name" autoComplete="name" placeholder="e.g. Amaka Eze" defaultValue={val.name} aria-invalid={Boolean(err.name)} />
          <FieldError>{err.name}</FieldError>
        </Field>

        <Field data-invalid={Boolean(err.phone)}>
          <FieldLabel htmlFor={id("phone")}>Phone / WhatsApp</FieldLabel>
          <input type="hidden" name="phone" value={fullPhone} />
          <InputGroup>
            <InputGroupAddon className="border-r border-line pr-3 text-fg">
              {/* SVG flag: Windows has no flag emoji. */}
              <svg viewBox="0 0 3 2" className="h-3.5 w-5 rounded-[2px]" aria-hidden>
                <rect width="1" height="2" fill="#008751" />
                <rect x="1" width="1" height="2" fill="#fff" />
                <rect x="2" width="1" height="2" fill="#008751" />
              </svg>
              +234
            </InputGroupAddon>
            <InputGroupInput
              id={id("phone")}
              type="tel"
              inputMode="tel"
              autoComplete="tel-national"
              placeholder="803 123 4567"
              value={localPhone}
              onChange={(e) => setLocalPhone(e.target.value)}
              aria-invalid={Boolean(err.phone)}
            />
          </InputGroup>
          <FieldError>{err.phone}</FieldError>
        </Field>

        <ChoiceGroup
          name="contactMethod"
          label="Best way to reach you"
          value={method}
          onChange={(v) => setMethod(v as Method)}
          options={methods.map((m) => ({ value: m.value, label: m.label, icon: m.icon }))}
          columns="grid-cols-3"
        />

        <AnimatePresence initial={false}>
          {method === "email" && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.35, ease: easeBlade }} className="overflow-hidden">
              <Field data-invalid={Boolean(err.email)} className="pt-1">
                <FieldLabel htmlFor={id("email")}>Email</FieldLabel>
                <Input id={id("email")} name="email" type="email" autoComplete="email" placeholder="you@example.com" defaultValue={val.email} aria-invalid={Boolean(err.email)} />
                <FieldError>{err.email}</FieldError>
              </Field>
            </motion.div>
          )}
        </AnimatePresence>

        <div>
          {type !== "contact" && (
            <button
              type="button"
              aria-expanded={moreOpen}
              onClick={() => setMoreOpen((o) => !o)}
              className="inline-flex items-center gap-2 text-sm text-accent-text transition-colors hover:text-fg"
            >
              <motion.span animate={{ rotate: moreOpen ? 45 : 0 }} transition={{ duration: 0.3 }} className="flex">
                <Plus className="size-4" aria-hidden />
              </motion.span>
              {moreOpen ? "Hide extra details" : "Add your city or a note"}
            </button>
          )}
          <AnimatePresence initial={false}>
            {moreOpen && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.35, ease: easeBlade }} className="overflow-hidden">
                <FieldGroup className={cn("gap-5", type !== "contact" && "pt-4")}>
                  <Field>
                    <FieldLabel htmlFor={id("city")}>City</FieldLabel>
                    <Input id={id("city")} name="city" autoComplete="address-level2" placeholder="Abuja, Lagos…" defaultValue={val.city} />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor={id("message")}>{type === "contact" ? "Your message" : "Anything else?"}</FieldLabel>
                    <Textarea id={id("message")} name="message" rows={3} defaultValue={val.message} />
                  </Field>
                </FieldGroup>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </FieldGroup>

      <AnimatePresence>
        {state.status === "unconfigured" && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease: easeBlade }} role="status" className="rounded-xl border border-line bg-surface-2/60 p-4 text-sm">
            <p className="font-medium">Online enquiries aren&apos;t live yet — your details were not sent.</p>
            {whatsappHref || phone ? (
              <p className="mt-2 flex flex-wrap gap-4 text-accent-text">
                {whatsappHref && (
                  <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 underline-offset-4 hover:underline">
                    <MessageCircle className="size-4" aria-hidden /> Message us on WhatsApp
                  </a>
                )}
                {phone && (
                  <a href={`tel:${phone}`} className="inline-flex items-center gap-1.5 underline-offset-4 hover:underline">
                    <Phone className="size-4" aria-hidden /> Call {formatPhone(phone)}
                  </a>
                )}
              </p>
            ) : (
              <p className="mt-1 text-muted">Please check back shortly.</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={pending}
        className="group/sub relative inline-flex h-13 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-accent px-6 font-medium text-on-accent shadow-[0_10px_40px_-10px_var(--vx-glow)] transition-[transform,box-shadow] duration-300 hover:shadow-[0_14px_50px_-8px_var(--vx-glow)] active:scale-[0.99] disabled:opacity-70"
      >
        {/* Darker sweep keeps white text above 4.5:1 on hover. */}
        <span aria-hidden className="absolute inset-y-0 -left-1/2 w-[200%] -translate-x-full skew-x-[-35deg] bg-blue-700 transition-transform duration-700 ease-blade group-hover/sub:translate-x-0 motion-reduce:hidden" />
        <span className="relative inline-flex items-center gap-2">
          {pending ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden /> Sending…
            </>
          ) : (
            <>
              {submitLabel}
              <ArrowRight className="size-4 transition-transform group-hover/sub:translate-x-1" aria-hidden />
            </>
          )}
        </span>
      </button>

      <p className="flex items-center gap-2 text-xs text-muted">
        <Lock className="size-3.5 shrink-0" aria-hidden />
        <span>
          Your details stay with Vertex EV Hub and are only used to reply.{" "}
          <Link href="/privacy" className="underline underline-offset-2 hover:text-fg">
            Privacy policy
          </Link>
        </span>
      </p>
    </form>
  );
}
