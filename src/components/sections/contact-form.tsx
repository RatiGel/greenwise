"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { MessageCircle } from "lucide-react"
import { toast } from "sonner"

import { services } from "@/content/services"
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

const projectTypes = [
  ...services.map((service) => service.title),
  "სხვა / ჯერ არ ვიცი",
]

const contactSchema = z.object({
  name: z
    .string()
    .min(2, { message: "მიუთითეთ სახელი (მინიმუმ 2 სიმბოლო)" })
    .max(80, { message: "სახელი ძალიან გრძელია" }),
  company: z.string().max(120, { message: "დასახელება ძალიან გრძელია" }).optional(),
  phone: z
    .string()
    .min(9, { message: "მიუთითეთ სწორი ტელეფონის ნომერი" })
    .max(20, { message: "ნომერი ძალიან გრძელია" })
    .regex(/^[0-9+\s()-]+$/, {
      message: "ნომერი უნდა შეიცავდეს მხოლოდ ციფრებს და სიმბოლოებს + ( ) -",
    }),
  email: z
    .union([z.string().email({ message: "მიუთითეთ სწორი ელ-ფოსტა" }), z.literal("")])
    .optional(),
  projectType: z.string().min(1, { message: "აირჩიეთ პროექტის ტიპი" }),
  message: z
    .string()
    .min(10, { message: "აღწერეთ პროექტი (მინიმუმ 10 სიმბოლო)" })
    .max(1500, { message: "ტექსტი ძალიან გრძელია" }),
})

type ContactValues = z.infer<typeof contactSchema>

export function ContactForm() {
  const form = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
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
    const url = buildWhatsAppUrl({
      name: values.name,
      company: values.company || undefined,
      phone: values.phone,
      email: values.email || undefined,
      projectType: values.projectType,
      message: values.message,
    })

    // Popup blockers only allow this inside the click-initiated handler.
    const opened = window.open(url, "_blank", "noopener,noreferrer")

    if (opened) {
      toast.success("WhatsApp იხსნება — შეტყობინება უკვე შევსებულია.")
      form.reset()
    } else {
      toast.error("ბრაუზერმა ახალი ფანჯარა დაბლოკა. სცადეთ ქვემოთ მოცემული ბმული.")
    }
  }

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
                <FormLabel>სახელი და გვარი *</FormLabel>
                <FormControl>
                  <Input placeholder="ნინო კაპანაძე" autoComplete="name" {...field} />
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
                <FormLabel>კომპანია</FormLabel>
                <FormControl>
                  <Input
                    placeholder="შპს „მაგალითი“"
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
                <FormLabel>ტელეფონი *</FormLabel>
                <FormControl>
                  <Input
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
                <FormLabel>ელ-ფოსტა</FormLabel>
                <FormControl>
                  <Input
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
              <FormLabel>პროექტის ტიპი *</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="აირჩიეთ მიმართულება" />
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
              <FormLabel>შეტყობინება *</FormLabel>
              <FormControl>
                <Textarea
                  rows={6}
                  placeholder="მოკლედ აღწერეთ ობიექტი, ფართობი, ლოკაცია და სასურველი ვადა."
                  className="resize-y"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" size="lg" className="mt-1 w-full sm:w-auto">
          <MessageCircle aria-hidden className="size-4" />
          WhatsApp-ით გაგზავნა
        </Button>

        <p className="text-xs leading-relaxed text-muted-foreground">
          ღილაკზე დაჭერით იხსნება WhatsApp უკვე შევსებული შეტყობინებით — გაგზავნამდე
          შეგიძლიათ შეასწოროთ. მონაცემები ჩვენს სერვერზე არ ინახება.
        </p>
      </form>
    </Form>
  )
}
