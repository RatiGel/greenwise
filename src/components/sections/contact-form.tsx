"use client"

import * as React from "react"
import { useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Check, Loader2, MessageCircle } from "lucide-react"
import { toast } from "sonner"

import { services } from "@/content/services"
import type { Dictionary } from "@/content/dictionaries/ka"
import { useDictionary, useLocale } from "@/lib/i18n/locale-context"
import { buildWhatsAppUrl } from "@/lib/whatsapp"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

/**
 * The zod schema's validation messages must be localized, and the dictionary
 * is only available inside the component (via `useDictionary()`), so the
 * schema is built by this factory instead of being declared at module scope.
 */
function buildContactSchema(t: Dictionary["form"]) {
  return z.object({
    name: z
      .string()
      .min(2, { message: t.nameTooShort })
      .max(80, { message: t.nameTooLong }),
    company: z.string().max(120, { message: t.companyTooLong }).optional(),
    phone: z
      .string()
      .min(9, { message: t.phoneTooShort })
      .max(20, { message: t.phoneTooLong })
      .regex(/^[0-9+\s()-]+$/, {
        message: t.phoneInvalidChars,
      }),
    email: z
      .union([z.string().email({ message: t.emailInvalid }), z.literal("")])
      .optional(),
    projectType: z.string().min(1, { message: t.projectTypeRequiredMessage }),
    message: z
      .string()
      .min(10, { message: t.messageTooShort })
      .max(1500, { message: t.messageTooLong }),
  })
}

type ContactValues = z.infer<ReturnType<typeof buildContactSchema>>

export function ContactForm() {
  const dictionary = useDictionary()
  const locale = useLocale()
  const t = dictionary.form

  const [status, setStatus] = React.useState<"idle" | "sending" | "sent">(
    "idle"
  )

  const projectTypes = React.useMemo(
    () => [...services.map((service) => service.title), t.projectTypeOther],
    [t.projectTypeOther]
  )

  const contactSchema = React.useMemo(() => buildContactSchema(t), [t])

  const form = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    // Validate when a field loses focus, not on every keystroke — an error
    // that appears mid-typing reads as the form arguing with you.
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      name: "",
      company: "",
      phone: "",
      email: "",
      projectType: "",
      message: "",
    },
  })

  function onSubmit(values: ContactValues) {
    setStatus("sending")

    const url = buildWhatsAppUrl(
      {
        name: values.name,
        company: values.company || undefined,
        phone: values.phone,
        email: values.email || undefined,
        projectType: values.projectType,
        message: values.message,
      },
      locale
    )

    // Popup blockers only allow this inside the click-initiated handler.
    const opened = window.open(url, "_blank", "noopener,noreferrer")

    if (opened) {
      setStatus("sent")
      toast.success(t.whatsappOpening)
      form.reset()
      // Return the button to its resting label so the form can be reused.
      window.setTimeout(() => setStatus("idle"), 4000)
    } else {
      setStatus("idle")
      toast.error(t.popupBlocked)
    }
  }

  // `useWatch` subscribes to one field instead of re-rendering the whole form
  // on every keystroke in any field.
  const message = useWatch({ control: form.control, name: "message" })
  const messageLength = message?.length ?? 0

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col gap-5"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.fullName}</FormLabel>
                <FormControl>
                  <Input
                    className="h-11"
                    placeholder={t.namePlaceholder}
                    autoComplete="name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.company}</FormLabel>
                <FormControl>
                  <Input
                    className="h-11"
                    placeholder={t.companyPlaceholder}
                    autoComplete="organization"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.phoneRequired}</FormLabel>
                <FormControl>
                  <Input
                    className="h-11"
                    type="tel"
                    inputMode="tel"
                    dir="ltr"
                    placeholder="+995 5XX XX XX XX"
                    autoComplete="tel"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.email}</FormLabel>
                <FormControl>
                  <Input
                    className="h-11"
                    type="email"
                    dir="ltr"
                    placeholder="name@company.ge"
                    autoComplete="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="projectType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.projectTypeRequired}</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="h-11 w-full">
                    <SelectValue placeholder={t.projectTypePlaceholder} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {projectTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-baseline justify-between gap-3">
                <FormLabel>{t.messageRequired}</FormLabel>
                <span
                  aria-hidden
                  className={
                    messageLength > 1500
                      ? "text-xs tabular-nums text-destructive"
                      : "text-xs tabular-nums text-white/50"
                  }
                >
                  {messageLength} / 1500
                </span>
              </div>
              <FormControl>
                <Textarea
                  rows={6}
                  placeholder={t.messagePlaceholder}
                  className="resize-y"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          size="lg"
          disabled={status !== "idle"}
          className="press mt-1 h-12 w-full sm:w-auto"
        >
          {status === "sending" ? (
            <>
              <Loader2 aria-hidden className="size-4 animate-spin" />
              {t.sending}
            </>
          ) : status === "sent" ? (
            <>
              <Check aria-hidden className="size-4" />
              {t.sent}
            </>
          ) : (
            <>
              <MessageCircle aria-hidden className="size-4" />
              {t.sendViaWhatsApp}
            </>
          )}
        </Button>

        {/* Announced to screen readers without stealing focus. */}
        <p aria-live="polite" className="sr-only">
          {status === "sending"
            ? t.liveStatusSending
            : status === "sent"
              ? t.liveStatusSent
              : ""}
        </p>

        <p className="text-xs leading-relaxed text-white/75">{t.disclaimer}</p>
      </form>
    </Form>
  )
}
