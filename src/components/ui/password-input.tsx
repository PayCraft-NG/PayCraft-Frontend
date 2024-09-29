import * as React from "react";

import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { InputProps } from "./input";

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, ...props }, ref) => {
		const [show, setShow] = React.useState(false);

		function handleShow() {
			setShow(!show);
		}

		return (
			<div className={cn("w-full relative flex items-center h-9", className)}>
				<input
					type={type === "password" ? (show ? "text" : "password") : type}
					className="h-full flex w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 pr-10"
					ref={ref}
					{...props}
				/>
				<button
					type="button"
					className="absolute right-0 mr-3"
					onClick={handleShow}
				>
					{show ? (
						<Eye
							size={20}
							strokeWidth={1.5}
						/>
					) : (
						<EyeOff
							size={20}
							strokeWidth={1.5}
						/>
					)}
				</button>
			</div>
		);
	}
);
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
