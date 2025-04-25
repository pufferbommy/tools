import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { GENDERS } from "@/constants";
import { PERSON_NAMES } from "@/constants";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const TYPES = [
  {
    id: "name",
    name: "ชื่อจริง",
  },
  {
    id: "last-name",
    name: "นามสกุล",
  },
  {
    id: "nickname",
    name: "ชื่อเล่น",
  },
];

const FormSchema = z.object({
  genders: z.array(z.string()).min(1, {
    message: "กรุณาเลือกเพศอย่างน้อย 1 เพศ",
  }),
  types: z.array(z.string()).min(1, {
    message: "กรุณาเลือกประเภทอย่างน้อย 1 ประเภท",
  }),
  amount: z.coerce.number({
    message: "กรุณากรอกจำนวน",
  }),
});

type FormSchema = z.infer<typeof FormSchema>;

export function FormSection({
  setResults,
}: {
  setResults: (value: any[]) => void;
}) {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      genders: ["male", "female"],
      types: ["name", "last-name", "nickname"],
      amount: 5,
    },
  });

  const onSubmit = ({ types, amount, genders }: FormSchema) => {
    const items = Array.from({ length: amount }, () => {
      const lastName = types.includes("last-name")
        ? PERSON_NAMES.lastNames[
            Math.floor(Math.random() * PERSON_NAMES.lastNames.length)
          ]
        : "";

      const gender = genders[Math.floor(Math.random() * genders.length)];

      if (gender === "male") {
        return {
          name: types.includes("name")
            ? PERSON_NAMES.maleNames[
                Math.floor(Math.random() * PERSON_NAMES.maleNames.length)
              ]
            : "",
          lastName,
          nickname: types.includes("nickname")
            ? PERSON_NAMES.maleNicknames[
                Math.floor(Math.random() * PERSON_NAMES.maleNicknames.length)
              ]
            : "",
        };
      }
      return {
        name: types.includes("name")
          ? PERSON_NAMES.femaleNames[
              Math.floor(Math.random() * PERSON_NAMES.femaleNames.length)
            ]
          : "",
        lastName,
        nickname: types.includes("nickname")
          ? PERSON_NAMES.femaleNicknames[
              Math.floor(Math.random() * PERSON_NAMES.femaleNicknames.length)
            ]
          : "",
      };
    });
    setResults(items);
  };

  const handleResetClick = () => {
    form.reset();
    setResults([]);
  };

  return (
    <section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="genders"
            render={({ field: { value, onChange } }) => (
              <FormItem>
                <FormLabel>เพศ</FormLabel>
                <FormControl>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {GENDERS.map((gender) => (
                      <Button
                        key={gender.value}
                        variant={
                          value.includes(gender.value) ? "default" : "outline"
                        }
                        onClick={() => {
                          if (value.includes(gender.value)) {
                            onChange(value.filter((v) => v !== gender.value));
                          } else {
                            onChange([...value, gender.value]);
                          }
                        }}
                        type="button"
                      >
                        {gender.icon}
                        {gender.name}
                      </Button>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="types"
            render={({ field: { value, onChange } }) => (
              <FormItem>
                <FormLabel>ประเภท</FormLabel>
                <FormControl>
                  <div className="flex gap-4">
                    {TYPES.map((type) => (
                      <div key={type.id} className="space-x-2">
                        <Checkbox
                          id={type.id}
                          checked={value.includes(type.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              onChange([...value, type.id]);
                            } else {
                              onChange(value.filter((v) => v !== type.id));
                            }
                          }}
                        />
                        <label htmlFor={type.id}>{type.name}</label>
                      </div>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>จำนวน</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={1}
                    {...field}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="space-x-2">
            <Button>สุ่ม</Button>
            <Button type="button" variant="outline" onClick={handleResetClick}>
              รีเซ็ต
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}
