import { useForm } from "react-hook-form";
import { cn } from "~/lib/utils";

export function BmiCalculator({
  setBmi,
}: {
  setBmi: (value: number | null) => void;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      weight: "" as unknown as number,
      height: "" as unknown as number,
    },
  });

  return (
    <section className="card card-border">
      <div className="card-body gap-4">
        <h2 className="card-title">คำนวณดัชนีมวลกาย (BMI)</h2>
        <form
          onSubmit={handleSubmit((data) => {
            return setBmi(data.weight / Math.pow(data.height / 100, 2));
          })}
          className="space-y-4"
        >
          <div className="space-y-2">
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
                setBmi(null);
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
