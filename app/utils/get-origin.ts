export function getOrigin(): string {
	const isServer = typeof window === "undefined";
	return isServer ? (process.env.ORIGIN ?? "") : window.location.origin;
}
