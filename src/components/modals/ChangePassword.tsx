import { useState } from "react";
import { Button } from "../ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import ChangePasswordForm from "../forms/ChangePasswordForm";

const ChangePassword = ({ disabled }: { disabled: boolean }) => {
	const [isOpen, setIsOpen] = useState(false);

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
					<ChangePasswordForm closeForm={() => setIsOpen(false)} />
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default ChangePassword;
