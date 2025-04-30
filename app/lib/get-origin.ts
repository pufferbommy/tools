import { createServerFn } from "@tanstack/react-start";
import { getHeader } from "@tanstack/react-start/server";

export const getOrigin = createServerFn({ method: "GET" }).handler(async () => {
	const host = getHeader("host");
	const proto = getHeader("x-forwarded-proto") || "http";
	return `${proto}://${host}`;
});
