import { useEffect, useId, useState } from "react";
import Asterisk from "./icons/asterisk";

export default function Loading() {
	const [id, setId] = useState("");

	useEffect(() => {
		const interval = setInterval(() => setId(new Date().toString()), 2000);
		return () => clearInterval(interval);
	}, []);

	return (
		<div key={id} className="flex gap-7 justify-center">
			<Asterisk className="size-10 opacity-0 text-primary animate-fade-in-out delay-250" />
			<Asterisk className="size-10 opacity-0 text-secondary animate-fade-in-out delay-500" />
			<Asterisk className="size-10 opacity-0 text-[#FFA128] animate-fade-in-out delay-750" />
			<Asterisk className="size-10 opacity-0 text-[#4CAADF] animate-fade-in-out delay-1000" />
		</div>
	);
}
