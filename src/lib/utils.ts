import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function convertToSeconds(timeStr: string): number {
	const DEFAULT_TIME = 120000; // 2 minutes in milliseconds
	const match = timeStr.match(/^(\d+)\s*(s|sec|secs|m|min|mins|h|hr|hrs)$/i);
	if (!match) return DEFAULT_TIME;

	const [, value, unit] = match;
	const time = parseInt(value, 10);
	if (isNaN(time)) return DEFAULT_TIME;

	const multipliers: { [key: string]: number } = {
		s: 1000,
		sec: 1000,
		secs: 1000,
		m: 60000,
		min: 60000,
		mins: 60000,
		h: 3600000,
		hr: 3600000,
		hrs: 3600000,
	};

	const multiplier = multipliers[unit.toLowerCase()];
	return multiplier ? time * multiplier : DEFAULT_TIME;
}

export const formatNumber = (value: number) => {
	// Remove non-digit characters
	const digits = `${value}`.replace(/\D/g, "");

	// Format the number with commas
	return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
