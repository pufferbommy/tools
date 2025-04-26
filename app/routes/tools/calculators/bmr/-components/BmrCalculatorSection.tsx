import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { cn } from "@/lib/utils";
import { GENDERS } from "@/constants";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const FormSchema = z.object({
  gender: z.enum(["male", "female"]),
  age: z.number({
    message: "กรุณากรอกอายุ",
  }),
  weight: z.number({
    message: "กรุณากรอกน้ำหนัก",
  }),
  height: z.number({
    message: "กรุณากรอกส่วนสูง",
  }),
});

type FormSchema = z.infer<typeof FormSchema>;

export function BmrCalculatorSection({
  setBmr,
}: {
  setBmr: (value: number | null) => void;
}) {
  const form = useForm<FormSchema>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      gender: "male",
      age: "" as unknown as number,
      weight: "" as unknown as number,
      height: "" as unknown as number,
    },
  });

  const onSubmit = (data: FormSchema) => {
    const heightMeters = data.height / 100; // Convert cm to m
    const bmr =
      data.gender === "male"
        ? 10 * data.weight + 6.25 * heightMeters - 5 * data.age + 5
        : 10 * data.weight + 6.25 * heightMeters - 5 * data.age - 161;
    return setBmr(bmr);
  };

  const handleResetClick = () => {
    form.reset();
    setBmr(null);
  };

  return (
    <section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="gender"
            render={({ field: { value, onChange } }) => (
              <FormItem>
                <FormLabel>เพศ</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={onChange}
                    defaultValue={value}
                    className="flex gap-4"
                  >
                    {GENDERS.map((gender) => (
                      <div className="flex items-center gap-2">
                        <RadioGroupItem
                          value={gender.value}
                          id={gender.value}
                        />
                        <Label htmlFor={gender.value}>{gender.name}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>อายุ</FormLabel>
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
            <Button
              variant="outline"
              type="button"
              onClick={handleResetClick}
              className="btn btn-outline"
            >
              รีเซ็ต
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}
