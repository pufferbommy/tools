import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const FormSchema = z.object({
  weight: z.number({
    message: "กรุณากรอกน้ำหนัก",
  }),
  height: z.number({
    message: "กรุณากรอกส่วนสูง",
  }),
});

type FormSchema = z.infer<typeof FormSchema>;

export function BmiCalculatorSection({
  setBmi,
}: {
  setBmi: (value: number | null) => void;
}) {
  const form = useForm<FormSchema>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      weight: "" as unknown as number,
      height: "" as unknown as number,
    },
  });

  const onSubmit = ({ weight, height }: FormSchema) => {
    const heightMeters = height / 100; // Convert height from cm to meters
    const bmiValue = weight / Math.pow(heightMeters, 2);
    setBmi(bmiValue);
  };

  const handleResetClick = () => {
    form.reset();
    setBmi(null);
  };

  return (
    <section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4 items-start">
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>น้ำหนัก (กิโลกรัม)</FormLabel>
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
              name="height"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ส่วนสูง (เซนติเมตร)</FormLabel>
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
            <Button>คำนวณ</Button>
            <Button type="button" variant="outline" onClick={handleResetClick}>
              รีเซ็ต
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}
