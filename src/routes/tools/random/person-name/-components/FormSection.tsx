import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "~/lib/utils";
import { GENDERS } from "~/constants";
import { PERSON_NAMES } from "~/constants";

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
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm({
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
    reset();
    setResults([]);
  };

  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <label className="block">เพศ</label>
          <Controller
            control={control}
            name="genders"
            render={({ field: { value, onChange } }) => (
              <div className="grid sm:grid-cols-2 gap-2">
                {GENDERS.map((gender) => (
                  <button
                    key={gender.value}
                    className={cn(
                      "btn",
                      value.includes(gender.value)
                        ? "btn-secondary"
                        : "btn-outline"
                    )}
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
                  </button>
                ))}
              </div>
            )}
          />
          {errors.genders && (
            <p className="text-error" role="alert">
              {errors.genders.message}
            </p>
          )}
        </div>
        <div className="grid md:grid-cols-2 gap-2">
          <div className="space-y-2">
            <label className="block">ประเภท</label>
            <Controller
              control={control}
              name="types"
              render={({ field: { value, onChange } }) => (
                <div className="flex gap-4 h-10">
                  {TYPES.map((type) => (
                    <label key={type.id} className="label gap-2">
                      <input
                        checked={value.includes(type.id)}
                        onChange={() => {
                          if (value.includes(type.id)) {
                            onChange(value.filter((v) => v !== type.id));
                          } else {
                            onChange([...value, type.id]);
                          }
                        }}
                        type="checkbox"
                        value={type.id}
                        className="checkbox"
                      />
                      {type.name}
                    </label>
                  ))}
                </div>
              )}
            />
            {errors.types && (
              <p className="text-error" role="alert">
                {errors.types.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label className="block">จำนวน</label>
            <input
              className="input w-full"
              {...register("amount", {
                valueAsNumber: true,
              })}
              type="number"
              min={1}
              aria-invalid={errors.amount ? "true" : "false"}
            />
          </div>
        </div>
        <div className="space-x-2">
          <button className="btn btn-primary">สุ่ม</button>
          <button
            type="button"
            onClick={handleResetClick}
            className="btn btn-outline"
          >
            รีเซ็ต
          </button>
        </div>
      </form>
    </section>
  );
}
