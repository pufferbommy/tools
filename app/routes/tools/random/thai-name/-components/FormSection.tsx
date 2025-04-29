import { z } from "zod";
import { useForm } from "react-hook-form";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

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

const LANGUAGES = [
  {
    id: "th",
    name: "ไทย",
  },
  {
    id: "en",
    name: "อังกฤษ",
  },
];

const FormSchema = z.object({
  gender: z.enum(["both", ...GENDERS.map((gender) => gender.value)]),
  types: z.array(z.string()).min(1, {
    message: "กรุณาเลือกประเภทอย่างน้อย 1 ประเภท",
  }),
  languages: z.array(z.string()).min(1, {
    message: "กรุณาเลือกภาษาอย่างน้อย 1 ภาษา",
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
  const form = useForm<FormSchema>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      gender: "both",
      types: ["name", "last-name", "nickname"],
      languages: ["th", "en"],
      amount: 5,
    },
  });

  const onSubmit = (data: FormSchema) => {
    const items = Array.from({ length: data.amount }, () => {
      const gender =
        data.gender === "both"
          ? GENDERS[Math.floor(Math.random() * GENDERS.length)].value
          : data.gender;

      const randomLastName =
        PERSON_NAMES.lastNames[
          Math.floor(Math.random() * PERSON_NAMES.lastNames.length)
        ];
      const lastName = data.types.includes("last-name")
        ? {
            th: data.languages.includes("th") ? randomLastName.th : "",
            en: data.languages.includes("en") ? randomLastName.en : "",
          }
        : null;

      if (gender === "male") {
        const maleName =
          PERSON_NAMES.maleNames[
            Math.floor(Math.random() * PERSON_NAMES.maleNames.length)
          ];
        const maleNickname =
          PERSON_NAMES.maleNicknames[
            Math.floor(Math.random() * PERSON_NAMES.maleNicknames.length)
          ];
        return {
          name: data.types.includes("name")
            ? {
                th: data.languages.includes("th") ? maleName.th : "",
                en: data.languages.includes("en") ? maleName.en : "",
              }
            : null,
          lastName,
          nickname: data.types.includes("nickname")
            ? {
                th: data.languages.includes("th") ? maleNickname.th : "",
                en: data.languages.includes("en") ? maleNickname.en : "",
              }
            : null,
        };
      }

      const femaleName =
        PERSON_NAMES.femaleNames[
          Math.floor(Math.random() * PERSON_NAMES.femaleNames.length)
        ];
      const femaleNickname =
        PERSON_NAMES.femaleNicknames[
          Math.floor(Math.random() * PERSON_NAMES.femaleNicknames.length)
        ];
      return {
        name: data.types.includes("name")
          ? {
              th: data.languages.includes("th") ? femaleName.th : "",
              en: data.languages.includes("en") ? femaleName.en : "",
            }
          : null,
        lastName,
        nickname: data.types.includes("nickname")
          ? {
              th: data.languages.includes("th") ? femaleNickname.th : "",
              en: data.languages.includes("en") ? femaleNickname.en : "",
            }
          : null,
      };
    });
    setResults(items);
  };

  return (
    <section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 items-start gap-4">
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
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="both" id="both" />
                        <Label htmlFor="both">ทั้งคู่</Label>
                      </div>
                      {GENDERS.map((gender) => (
                        <div
                          key={gender.value}
                          className="flex items-center gap-2"
                        >
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
            <FormField
              control={form.control}
              name="types"
              render={({ field: { value, onChange } }) => (
                <FormItem>
                  <FormLabel>ประเภท</FormLabel>
                  <FormControl>
                    <div className="flex gap-4">
                      {TYPES.map((type) => (
                        <div key={type.id} className="flex gap-2 items-center">
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
                          <Label htmlFor={type.id}>{type.name}</Label>
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
              name="languages"
              render={({ field: { value, onChange } }) => (
                <FormItem>
                  <FormLabel>ภาษา</FormLabel>
                  <FormControl>
                    <div className="flex gap-4">
                      {LANGUAGES.map((language) => (
                        <div
                          key={language.id}
                          className="flex gap-2 items-center"
                        >
                          <Checkbox
                            id={language.id}
                            checked={value.includes(language.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                onChange([...value, language.id]);
                              } else {
                                onChange(
                                  value.filter((v) => v !== language.id)
                                );
                              }
                            }}
                          />
                          <Label htmlFor={language.id}>{language.name}</Label>
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
                    <div className="flex gap-2">
                      <Input
                        className="w-auto"
                        type="number"
                        min={1}
                        max={25}
                        {...field}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      />
                      <Slider
                        defaultValue={[field.value]}
                        onValueChange={(value) =>
                          field.onChange(Number(value[0]))
                        }
                        min={1}
                        max={25}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button>สุ่มชื่อ</Button>
        </form>
      </Form>
    </section>
  );
}
