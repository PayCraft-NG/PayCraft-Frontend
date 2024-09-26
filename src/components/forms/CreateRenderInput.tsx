import {
	FieldErrors,
	FieldValues,
	Path,
	UseFormRegister,
} from "react-hook-form";
import { InputProps } from "../ui/input";
import { Label } from "../ui/label";

interface RenderInputProps<TFieldValues extends FieldValues> {
	name: Path<TFieldValues>;
	label: string;
	type: string;
}

export function createRenderInput<TFieldValues extends FieldValues>(
	Input: React.ForwardRefExoticComponent<
		InputProps & React.RefAttributes<HTMLInputElement>
	>,
	register: UseFormRegister<TFieldValues>,
	errors: FieldErrors<TFieldValues>,
	isEditing = true
) {
	return function RenderInput({
		name,
		label,
		type,
	}: RenderInputProps<TFieldValues>) {
		return (
			<div>
				<Label
					className="text-sm md:text-base font-normal"
					htmlFor={name}
				>
					{label}
				</Label>
				<Input
					{...register(name)}
					id={name}
					type={type}
					disabled={!isEditing}
					className="my-1 text-sm"
				/>
				{errors[name] && (
					<p className="text-red-500 font-medium text-xs text-wrap">
						{errors[name]?.message as React.ReactNode}
					</p>
				)}
			</div>
		);
	};
}
