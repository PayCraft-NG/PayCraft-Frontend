import { PasswordRegex } from "@/constants/regex";
import { useUpdatePassword } from "@/hooks/useUpdatePassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createRenderInput } from "../forms/CreateRenderInput";
import { Button } from "../ui/button";
import { PasswordInput } from "../ui/password-input";

const schema = z.object({
	oldPassword: z
		.string()
		.min(8, { message: "Minimum of 8 characters" })
		.regex(PasswordRegex, {
			message:
				"Password must contain at least one uppercase letter, one lowercase letter, one number and one special character.",
		}),
	newPassword: z
		.string()
		.min(8, { message: "Minimum of 8 characters" })
		.regex(PasswordRegex, {
			message:
				"Password must contain at least one uppercase letter, one lowercase letter, one number and one special character.",
		}),
});

export type UpdatePasswordForm = z.infer<typeof schema>;

const ChangePasswordForm = ({ closeForm }: { closeForm: () => void }) => {
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

	const { mutate: updatePassword, isPending } = useUpdatePassword();

	const onSubmit = (data: UpdatePasswordForm) => {
		updatePassword(data, { onSuccess: () => closeForm() });
		reset();
	};

	return (
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

			<Button
				type="submit"
				onClick={handleSubmit(onSubmit)}
				disabled={isPending}
			>
				Save Changes
			</Button>
		</form>
	);
};

export default ChangePasswordForm;
