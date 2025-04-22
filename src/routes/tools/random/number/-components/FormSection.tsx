import { useForm } from "react-hook-form";
import { cn } from "~/lib/utils";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm({
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
    reset();
    setNumber(null);
  };

  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block">ตัวเลขเริ่มต้น</label>
            <input
              {...register("start", {
                valueAsNumber: true,
              })}
              type="number"
              className={cn("w-full input", errors.start && "input-error")}
              aria-invalid={errors.start ? "true" : "false"}
            />
            {errors.start && (
              <p className="text-error" role="alert">
                {errors.start.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label className="block">ตัวเลขสิ้นสุด</label>
            <input
              {...register("end", {
                required: "กรุณากรอกตัวเลขต่ำสุด",
                valueAsNumber: true,
              })}
              type="number"
              className={cn("w-full input", errors.end && "input-error")}
              aria-invalid={errors.end ? "true" : "false"}
            />
            {errors.end && (
              <p className="text-error" role="alert">
                {errors.end.message}
              </p>
            )}
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
