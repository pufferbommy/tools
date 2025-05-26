import { cn } from "@/lib/utils";

export default function Asterisk({
	className,
	...props
}: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			width="16"
			height="16"
			viewBox="0 0 16 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={cn("text-secondary", className)}
			aria-hidden="true"
			{...props}
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M3.23197 8L0 6.09914L2.38215 1.90086L5.616 3.79844L5.61782 0H10.3822L10.384 3.79844L13.6178 1.90086L16 6.09914L12.768 8L16 9.90086L13.6178 14.0991L10.384 12.2016L10.3822 16H5.61782L5.616 12.2016L2.38215 14.0991L0 9.90086L3.23197 8Z"
				fill="currentColor"
			/>
		</svg>
	);
}
