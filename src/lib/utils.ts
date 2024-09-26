import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function convertToSeconds(timeStr: string): number {
	try {
		const match = timeStr.match(/^(\d+)\s*([a-z]+)$/i);
		if (!match) {
			throw new Error("Invalid time format");
		}

		const [, timeValue, unit] = match;
		const time = parseInt(timeValue, 10);

		if (isNaN(time)) {
			throw new Error("Invalid time value");
		}

		switch (unit.toLowerCase()) {
			case "s":
			case "sec":
			case "secs":
			case "second":
			case "seconds":
				return time;
			case "m":
			case "min":
			case "mins":
			case "minute":
			case "minutes":
				return time * 60;
			case "h":
			case "hr":
			case "hrs":
			case "hour":
			case "hours":
				return time * 60 * 60;
			default:
				throw new Error("Unknown time unit");
		}
	} catch (error) {
		return 1 * 60 * 60;
	}
}
