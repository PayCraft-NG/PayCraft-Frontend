import { passwordRegex } from "@/constants/regex";
import { useUpdatePassword } from "@/hooks/useUpdatePassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createRenderInput } from "../forms/CreateRenderInput";
import { Button } from "../ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import { PasswordInput } from "../ui/password-input";

const schema = z.object({
	oldPassword: z
		.string()
		.min(8, { message: "Minimum of 8 characters" })
		.regex(passwordRegex, {
			message:
				"Password must contain at least one uppercase letter, one lowercase letter, one number and one special character.",
		}),
	newPassword: z
		.string()
		.min(8, { message: "Minimum of 8 characters" })
		.regex(passwordRegex, {
			message:
				"Password must contain at least one uppercase letter, one lowercase letter, one number and one special character.",
		}),
});

export type UpdatePasswordForm = z.infer<typeof schema>;

const ChangePassword = ({ disabled }: { disabled: boolean }) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<UpdatePasswordForm>({
		mode: "onChange",
		resolver: zodResolver(schema),
	});

	const renderInput = createRenderInput<UpdatePasswordForm>(
		PasswordInput,
		register,
		errors
	);

	const [isOpen, setIsOpen] = useState(false);

	const { mutate: updatePassword, isPending } = useUpdatePassword();

	const onSubmit = (data: UpdatePasswordForm) => {
		updatePassword(data, { onSuccess: () => setIsOpen(false) });
		reset();
	};

	return (
		<div className="mt-6">
			<Dialog
				open={isOpen}
				onOpenChange={setIsOpen}
			>
				<DialogTrigger
					disabled={disabled}
					asChild
				>
					<Button
						type="button"
						variant="outline"
					>
						Change Password
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Change Password</DialogTitle>
						<DialogDescription>
							Enter your new password below. We recommend using a strong, unique
							password.
						</DialogDescription>
					</DialogHeader>
					<form>
						<div className="grid gap-4 py-4">
							{renderInput({
								name: "oldPassword",
								label: "Old Password",
								type: "password",
							})}
							{renderInput({
								name: "newPassword",
								label: "New Password",
								type: "password",
							})}
						</div>
						<DialogFooter>
							<Button
								type="submit"
								onClick={handleSubmit(onSubmit)}
								disabled={isPending}
							>
								Save Changes
							</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default ChangePassword;
