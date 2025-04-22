import { Controller, useForm } from "react-hook-form";
import { GENDERS } from "~/constants";
import { cn } from "~/lib/utils";

export function BmrCalculatorSection({
  setBmr,
}: {
  setBmr: (value: number | null) => void;
}) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      gender: "male",
      age: "" as unknown as number,
      weight: "" as unknown as number,
      weightUnit: "kilogram" as unknown as "kilogram" | "pound",
      heightUnit: "centimeter" as unknown as "centimeter" | "meter",
      height: "" as unknown as number,
    },
  });

  const weightUnit = watch("weightUnit");
  const heightUnit = watch("heightUnit");

  const onSubmit = (data: {
    gender: string;
    weight: number;
    weightUnit: string;
    height: number;
    heightUnit: string;
    age: number;
  }) => {
    const weight =
      data.weightUnit === "kilogram" ? data.weight : data.weight * 2.20462;
    const height =
      data.heightUnit === "centimeter" ? data.height / 100 : data.height;
    const bmr =
      data.gender === "male"
        ? 10 * weight + 6.25 * height - 5 * data.age + 5
        : 10 * weight + 6.25 * height - 5 * data.age - 161;
    return setBmr(bmr);
  };

  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <label className="block">เพศ</label>
          <Controller
            control={control}
            name="gender"
            render={({ field: { value, onChange } }) => (
              <div className="grid sm:grid-cols-2 gap-2">
                {GENDERS.map((gender) => (
                  <button
                    key={gender.value}
                    className={cn(
                      "btn",
                      value === gender.value ? "btn-secondary" : "btn-outline"
                    )}
                    onClick={() => onChange(gender.value)}
                    type="button"
                  >
                    {gender.icon}
                    {gender.name}
                  </button>
                ))}
              </div>
            )}
          />
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="block">อายุ</label>
            <div className={cn("input w-full", errors.age && "input-error")}>
              <input
                {...register("age", {
                  required: "กรุณากรอกอายุ",
                  valueAsNumber: true,
                })}
                type="number"
                min={0}
                aria-invalid={errors.age ? "true" : "false"}
              />
              <span className="text-base-content/50">ปี</span>
            </div>
            {errors.age && (
              <p className="text-error" role="alert">
                {errors.age.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label className="block">น้ำหนัก</label>
            <div className="w-full join">
              <input
                {...register("weight", {
                  required: "กรุณากรอกน้ำหนัก",
                  valueAsNumber: true,
                })}
                min={0}
                step={weightUnit === "kilogram" ? 1 : 0.1}
                type="number"
                className={cn(
                  "join-item input w-full",
                  errors.weight && "input-error"
                )}
                aria-invalid={errors.weight ? "true" : "false"}
              />
              <select
                {...register("weightUnit")}
                className={cn(
                  "select join-item w-auto",
                  errors.weight && "border-l-error"
                )}
              >
                <option value="kilogram">กิโลกรัม</option>
                <option value="pound">ปอนด์</option>
              </select>
            </div>
            {errors.weight && (
              <p className="text-error" role="alert">
                {errors.weight.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label className="block">ส่วนสูง</label>
            <div className="w-full join">
              <input
                {...register("height", {
                  required: "กรุณากรอกส่วนสูง",
                  valueAsNumber: true,
                })}
                min={0}
                type="number"
                step={heightUnit === "centimeter" ? 1 : 0.1}
                className={cn(
                  "join-item input w-full",
                  errors.height && "input-error"
                )}
                aria-invalid={errors.height ? "true" : "false"}
              />
              <select
                {...register("heightUnit")}
                className={cn(
                  "select join-item w-auto",
                  errors.height && "border-l-error"
                )}
              >
                <option value="centimeter">เซนติเมตร</option>
                <option value="meter">เมตร</option>
              </select>
            </div>
            {errors.height && (
              <p className="text-error" role="alert">
                {errors.height.message}
              </p>
            )}
          </div>
        </div>
        <div className="space-x-2">
          <button className="btn btn-primary">คำนวณ</button>
          <button
            type="button"
            onClick={() => {
              reset();
              setBmr(null);
            }}
            className="btn btn-outline"
          >
            รีเซ็ต
          </button>
        </div>
      </form>
    </section>
  );
}
