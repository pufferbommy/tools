import { cn } from "@/lib/utils";
import type { AnyFieldApi } from "@tanstack/react-form";

export default function FieldInfo({
	field,
	className,
	...props
}: React.ComponentPropsWithoutRef<"div"> & { field: AnyFieldApi }) {
	return (
		<>
			{!field.state.meta.isValid ? (
				<div className={cn("text-destructive text-sm", className)} {...props}>
					{field.state.meta.errors.join(", ")}
				</div>
			) : null}
		</>
	);
}
