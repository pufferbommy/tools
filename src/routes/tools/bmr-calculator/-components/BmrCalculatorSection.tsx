import { Controller, useForm } from "react-hook-form";
import { cn } from "~/lib/utils";

const GENDERS = [
  {
    value: "male",
    name: "ชาย",
  },
  {
    value: "female",
    name: "หญิง",
  },
];

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
  } = useForm({
    defaultValues: {
      gender: "male" as unknown as string,
      age: "" as unknown as number,
      weight: "" as unknown as number,
      height: "" as unknown as number,
    },
  });

  return (
    <section className="card card-border">
      <div className="card-body gap-4">
        <h2 className="card-title">คำนวณอัตราการเผาผลาญพลังงานพื้นฐาน (BMR)</h2>
        <form
          onSubmit={handleSubmit(({ gender, weight, height, age }) => {
            const bmr =
              gender === "male"
                ? 10 * weight + 6.25 * height - 5 * age + 5
                : 10 * weight + 6.25 * height - 5 * age - 161;
            return setBmr(bmr);
          })}
          className="space-y-4"
        >
          <div className="space-y-2">
            <label className="block">เพศ</label>
            <Controller
              control={control}
              name="gender"
              render={({ field: { value, onChange } }) => (
                <div className="grid grid-cols-2 gap-2">
                  {GENDERS.map((gender) => (
                    <button
                      className={cn(
                        "btn btn-outline",
                        value === gender.value && "btn-active"
                      )}
                      onClick={() => onChange(gender.value)}
                      type="button"
                    >
                      {gender.name}
                    </button>
                  ))}
                </div>
              )}
            />
            <label className="block">อายุ</label>
            <div className={cn("input w-full", errors.age && "input-error")}>
              <input
                {...register("age", {
                  required: "กรุณากรอกอายุ",
                  min: 0,
                  valueAsNumber: true,
                })}
                type="number"
                aria-invalid={errors.age ? "true" : "false"}
              />
              <span className="text-base-content/50">ปี</span>
            </div>
            {errors.age && (
              <p className="text-error" role="alert">
                {errors.age.message}
              </p>
            )}

            <label className="block">น้ำหนัก</label>
            <div className={cn("input w-full", errors.weight && "input-error")}>
              <input
                {...register("weight", {
                  required: "กรุณากรอกน้ำหนัก",
                  min: 0,
                  valueAsNumber: true,
                })}
                type="number"
                aria-invalid={errors.weight ? "true" : "false"}
              />
              <span className="text-base-content/50">กิโลกรัม</span>
            </div>
            {errors.weight && (
              <p className="text-error" role="alert">
                {errors.weight.message}
              </p>
            )}

            <label className="block">ส่วนสูง</label>
            <div className={cn("input w-full", errors.height && "input-error")}>
              <input
                {...register("height", {
                  required: "กรุณากรอกส่วนสูง",
                  min: 0,
                  valueAsNumber: true,
                })}
                type="number"
                aria-invalid={errors.height ? "true" : "false"}
              />
              <span className="text-base-content/50">เซนติเมตร</span>
            </div>
            {errors.height && (
              <p className="text-error" role="alert">
                {errors.height.message}
              </p>
            )}
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
      </div>
    </section>
  );
}
