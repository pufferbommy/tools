import { Slot } from "@radix-ui/react-slot";
import type * as React from "react";

import { cn } from "@/lib/utils";

function Card({
	className,
	asChild,
	...props
}: React.ComponentProps<"div"> & { asChild?: boolean }) {
	const Comp = asChild ? Slot : "div";

	return (
		<Comp
			data-slot="card"
			className={cn(
				"bg-card text-card-foreground transition-colors flex flex-col gap-4 rounded-md border py-4 hover:shadow-none [--tw-shadow-color:oklch(from_var(--border)_l_c_h/0.5)] shadow-[0_-0.125rem_0_inset]",
				className,
			)}
			{...props}
		/>
	);
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-header"
			className={cn(
				"@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-4 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-4",
				className,
			)}
			{...props}
		/>
	);
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-title"
			className={cn("leading-none font-bold", className)}
			{...props}
		/>
	);
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-description"
			className={cn("text-muted-foreground text-sm", className)}
			{...props}
		/>
	);
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-action"
			className={cn(
				"col-start-2 row-span-2 row-start-1 self-start justify-self-end",
				className,
			)}
			{...props}
		/>
	);
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-content"
			className={cn("px-4", className)}
			{...props}
		/>
	);
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-footer"
			className={cn("flex items-center px-4 [.border-t]:pt-4", className)}
			{...props}
		/>
	);
}

export {
	Card,
	CardHeader,
	CardFooter,
	CardTitle,
	CardAction,
	CardDescription,
	CardContent,
};
