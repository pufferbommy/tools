import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

const FormSchema = z.object({
	min: z.number({
		message: "กรุณากรอกตัวเลขต่ำสุด",
	}),
	max: z.number({
		message: "กรุณากรอกตัวเลขสูงสุด",
	}),
});

export type FormSchema = z.infer<typeof FormSchema>;

export function FormSection({
	onSubmit,
}: {
	onSubmit: (data: FormSchema) => void;
}) {
	const form = useForm<FormSchema>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			min: 0,
			max: 100,
		},
	});

	return (
		<section>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-4">
						<FormField
							control={form.control}
							name="min"
							render={({ field }) => (
								<FormItem>
									<FormLabel>ตัวเลขต่ำสุด</FormLabel>
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
							name="max"
							render={({ field }) => (
								<FormItem>
									<FormLabel>ตัวเลขสูงสุด</FormLabel>
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
					<Button>สุ่ม</Button>
				</form>
			</Form>
		</section>
	);
}
