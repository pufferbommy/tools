import { useForm } from "react-hook-form";
import { cn } from "~/lib/utils";

export function BmiCalculatorSection({
  setBmi,
}: {
  setBmi: (value: number | null) => void;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      weight: "" as unknown as number,
      weightUnit: "kilogram",
      height: "" as unknown as number,
      heightUnit: "centimeter",
    },
  });

  const weightUnit = watch("weightUnit");
  const heightUnit = watch("heightUnit");

  const onSubmit = (data: {
    weight: number;
    weightUnit: string;
    height: number;
    heightUnit: string;
  }) => {
    const weight =
      data.weightUnit === "kilogram" ? data.weight : data.weight * 2.20462;
    const height =
      data.heightUnit === "centimeter" ? data.height / 100 : data.height;
    const bmiValue = weight / Math.pow(height, 2);
    setBmi(bmiValue);
  };

  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block">น้ำหนัก</label>
            <div className={cn("w-full join", errors.weight && "input-error")}>
              <input
                {...register("weight", {
                  required: "กรุณากรอกน้ำหนัก",
                  valueAsNumber: true,
                })}
                min={0}
                step={weightUnit === "kilogram" ? 1 : 0.1}
                type="number"
                className="join-item input w-full"
                aria-invalid={errors.weight ? "true" : "false"}
              />
              <select
                {...register("weightUnit")}
                className="select join-item w-auto"
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
            <div className={cn("w-full join", errors.height && "input-error")}>
              <input
                {...register("height", {
                  required: "กรุณากรอกส่วนสูง",
                  valueAsNumber: true,
                })}
                min={0}
                type="number"
                step={heightUnit === "centimeter" ? 1 : 0.1}
                className="join-item input w-full"
                aria-invalid={errors.height ? "true" : "false"}
              />
              <select
                {...register("heightUnit")}
                className="select join-item w-auto"
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
              setBmi(null);
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
