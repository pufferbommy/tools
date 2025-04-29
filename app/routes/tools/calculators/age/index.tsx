import ToolLayout from "@/components/ToolLayout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getOrigin } from "@/lib/get-origin";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const items = [
  {
    id: "1",
    title: "วิธีการใช้งาน",
    content: (
      <ol className="list-decimal list-inside space-y-2">
        <li>กรอกวัน/เดือน/ปีเกิดของคุณ</li>
        <li>กดคำนวณอายุ</li>
        <li>ระบบจะแสดงผลลัพธ์อายุของคุณในรูปแบบ ปี เดือน วัน</li>
      </ol>
    ),
  },
];

const FormSchema = z.object({
  dateOfBirth: z.date(),
});

type FormSchema = z.infer<typeof FormSchema>;

export const Route = createFileRoute("/tools/calculators/age/")({
  component: RouteComponent,
  loader: async (context) => {
    const origin = await getOrigin();
    const pathname = context.location.pathname;
    const url = `${origin}${pathname}`;
    return { url };
  },
});

function RouteComponent() {
  const { url } = Route.useLoaderData();

  const form = useForm<FormSchema>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      dateOfBirth: new Date(new Date().getFullYear() - 20, 0, 1),
    },
  });

  const [age, setAge] = useState<{
    years: number;
    months: number;
    days: number;
  } | null>(null);

  const dateOfBirth = form.watch("dateOfBirth");

  const onSubmit = (data: FormSchema) => {
    const today = new Date();
    let years = today.getFullYear() - data.dateOfBirth.getFullYear();
    let months = today.getMonth() - data.dateOfBirth.getMonth();
    let days = today.getDate() - data.dateOfBirth.getDate();

    if (days < 0) {
      months--;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    setAge({
      years,
      months,
      days,
    });
  };

  const dates = useMemo(() => {
    const date = new Date(dateOfBirth.getFullYear(), dateOfBirth.getMonth(), 1);
    const dates = [];
    while (date.getMonth() === dateOfBirth.getMonth()) {
      dates.push(new Date(date).getDate().toString());
      date.setDate(date.getDate() + 1);
    }
    return dates;
  }, [dateOfBirth]);

  const months = useMemo(() => {
    const date = new Date(dateOfBirth.getFullYear(), 0, 1);
    const months = [];
    while (date.getFullYear() <= dateOfBirth.getFullYear()) {
      months.push(
        new Date(date).toLocaleDateString("th-TH", {
          month: "long",
        })
      );
      date.setMonth(date.getMonth() + 1);
    }
    return months;
  }, [dateOfBirth]);

  const years = useMemo(() => {
    const now = new Date();
    const date = new Date(now.getFullYear() - 100, 0, 1);
    const years = [];
    while (date.getFullYear() <= now.getFullYear()) {
      years.push(new Date(date).getFullYear());
      date.setFullYear(date.getFullYear() + 1);
    }
    return years.reverse();
  }, []);

  return (
    <ToolLayout
      breadcrumbs={[
        {
          label: "เครื่องคำนวณ",
          href: "/tools/calculators",
        },
        {
          label: "คำนวณอายุ",
          href: "/tools/calculators/age",
        },
      ]}
      title="คำนวณอายุ"
      description="เครื่องมือสำหรับคำนวณอายุจากวันเกิด"
      url={url}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>วันเกิด</FormLabel>
                <FormControl>
                  <div className="flex gap-2">
                    <Select
                      value={field.value.toLocaleDateString("th-TH", {
                        day: "numeric",
                      })}
                      onValueChange={(value) => {
                        const newDate = new Date(field.value);
                        newDate.setDate(Number(value));
                        field.onChange(newDate);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="วัน" />
                      </SelectTrigger>
                      <SelectContent>
                        {dates.map((date) => (
                          <SelectItem value={date}>{date}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select
                      value={field.value.getMonth().toString()}
                      onValueChange={(value) => {
                        const newDate = new Date(field.value);
                        newDate.setMonth(Number(value));
                        field.onChange(newDate);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="เดือน" />
                      </SelectTrigger>
                      <SelectContent>
                        {months.map((month, i) => (
                          <SelectItem value={i.toString()}>{month}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select
                      value={field.value.getFullYear().toString()}
                      onValueChange={(value) => {
                        const newDate = new Date(field.value);
                        newDate.setFullYear(Number(value));
                        field.onChange(newDate);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="ปี" />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map((year) => (
                          <SelectItem value={year.toString()}>
                            {
                              new Date(year, 0, 1)
                                .toLocaleDateString("th-TH", {
                                  year: "numeric",
                                })
                                .split(" ")[1]
                            }
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {age && (
            <div>
              คุณมีอายุ <span className="text-primary">{age.years}</span> ปี{" "}
              <span className="text-primary">{age.months}</span> เดือน{" "}
              <span className="text-primary">{age.days}</span> วัน
            </div>
          )}
          <div className="space-x-2">
            <Button
              type="button"
              onClick={() => {
                form.reset();
                setAge(null);
              }}
              variant="secondary"
            >
              รีเซ็ต
            </Button>
            <Button>คำนวณ</Button>
          </div>
        </form>
      </Form>
      <Accordion
        type="single"
        defaultValue="1"
        collapsible
        className="-space-y-px"
      >
        {items.map((item) => (
          <AccordionItem
            value={item.id}
            className="has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative border px-4 py-1 outline-none first:rounded-t-md last:rounded-b-md last:border-b has-focus-visible:z-10 has-focus-visible:ring-[3px]"
          >
            <AccordionTrigger className="py-2 leading-6 hover:no-underline focus-visible:ring-0">
              {item.title}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-2">
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </ToolLayout>
  );
}
