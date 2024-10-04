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

export const formatNumber = (value: number): string => {
	// Convert to string and split into integer and decimal parts
	const [integerPart, decimalPart] = value.toString().split(".");

	// Format the integer part with commas
	const formattedIntegerPart = integerPart.replace(
		/\B(?=(\d{3})+(?!\d))/g,
		","
	);

	// If there's a decimal part, add it back
	if (decimalPart !== undefined) {
		return `${formattedIntegerPart}.${decimalPart}`;
	}

	return formattedIntegerPart;
};

export const formatCardNumber = (value: string): string => {
	// Remove all non-digit characters
	const digitsOnly = value.replace(/\D/g, "");

	// Limit the input to 16 digits
	const truncated = digitsOnly.slice(0, 16);

	// Split the string into groups of 4 digits
	const parts = truncated.match(/[\s\S]{1,4}/g) || [];

	// Join the parts with a space
	return parts.join(" ");
};

export function maskString(input: string): string {
	if (input.length !== 16) {
		throw new Error("Input string must be exactly 16 characters long");
	}

	const maskedPart = "*".repeat(12);
	const visiblePart = input.slice(-4);

	return maskedPart + visiblePart;
}

export function convertToReadableDate(timestamp: string): string {
	const dt = new Date(timestamp);

	const options: Intl.DateTimeFormatOptions = {
		year: "numeric",
		month: "long",
		day: "numeric",
	};

	return dt.toLocaleDateString("en-US", options);
}
