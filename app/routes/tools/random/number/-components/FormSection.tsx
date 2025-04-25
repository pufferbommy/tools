import { z } from "zod";
import { useForm } from "react-hook-form";

import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const FormSchema = z.object({
  start: z.coerce.number({
    message: "กรุณากรอกตัวเลขเริ่มต้น",
  }),
  end: z.coerce.number({
    message: "กรุณากรอกตัวเลขสิ้นสุด",
  }),
});

type FormSchema = z.infer<typeof FormSchema>;

export function FormSection({
  setNumber,
}: {
  setNumber: (value: number | null) => void;
}) {
  const form = useForm<FormSchema>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      start: 0,
      end: 100,
    },
  });

  const onSubmit = (data: FormSchema) => {
    const { start, end } = data;
    const randomNumber = Math.floor(Math.random() * (end - start + 1)) + start;
    setNumber(randomNumber);
  };

  const handleResetClick = () => {
    form.reset();
    setNumber(null);
  };

  return (
    <section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="start"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ตัวเลขเริ่มต้น</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="end"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ตัวเลขสิ้นสุด</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-x-2">
            <Button>สุ่ม</Button>
            <Button variant="outline" type="button" onClick={handleResetClick}>
              รีเซ็ต
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}
