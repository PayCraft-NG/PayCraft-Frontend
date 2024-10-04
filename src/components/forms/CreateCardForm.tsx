import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createRenderInput } from "./CreateRenderInput";
import { useState } from "react";
import { useCreateCard } from "@/hooks/wallet/useCreateCard";

const schema = z.object({
	cardNumber: z
		.string()
		.length(16, "Card number must be exactly 16 digits")
		.regex(/^\d+$/, "Card number must only contain digits"),
	expiryMonth: z
		.string()
		.length(2, "Expiry month must be exactly 2 digits")
		.regex(/^(0[1-9]|1[0-2])$/, "Expiry month must be a valid month (01-12)"),
	expiryYear: z
		.string()
		.length(2, "Expiry year must be exactly 2 digits")
		.regex(/^\d{2}$/, "Expiry year must be 2 digits"),
	cvv: z
		.string()
		.length(3, "CVV must be exactly 3 digits")
		.regex(/^\d{3}$/, "CVV must be 3 digits"),
	cardPin: z
		.string()
		.length(4, "Card PIN must be exactly 4 digits")
		.regex(/^\d{4}$/, "Card PIN must be 4 digits"),
});

export type CardForm = z.infer<typeof schema>;

const CreateCardForm = () => {
	const [isOpen, setIsOpen] = useState(false);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<CardForm>({
		mode: "onChange",
		resolver: zodResolver(schema),
	});

	const renderInput = createRenderInput(Input, register, errors);

	const { mutate: createCard, isPending } = useCreateCard();

	const onSubmit = (data: CardForm) => {
		console.log(data);
		reset();
		createCard(data, {
			onSettled: () => setIsOpen(false),
		});
	};

	return (
		<Dialog
			open={isOpen}
			onOpenChange={setIsOpen}
		>
			<DialogTrigger asChild>
				<Button>
					<Plus className="mr-2 h-4 w-4" />
					Add New Card
				</Button>
			</DialogTrigger>
			<DialogContent
				onPointerDownOutside={(e) => e.preventDefault()}
				className="sm:max-w-[425px]"
			>
				<DialogHeader>
					<DialogTitle>Add New Card</DialogTitle>
					<DialogDescription>
						Enter your debit card details here. Click save when you're done.
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div
						onSubmit={handleSubmit(onSubmit)}
						className="grid gap-4 py-4"
					>
						{renderInput({
							name: "cardNumber",
							label: "Card Number",
							type: "text",
							placeholder: "1234567890123456",
						})}
						<div className="grid gap-6 grid-cols-2">
							{renderInput({
								name: "expiryMonth",
								label: "Expiry Month",
								type: "text",
								placeholder: "MM",
								className: "w-1/2",
							})}
							{renderInput({
								name: "expiryYear",
								label: "Expiry Year",
								type: "text",
								placeholder: "YY",
								className: "w-1/2",
							})}
						</div>
						<div className="grid gap-6 grid-cols-2">
							{renderInput({
								name: "cvv",
								label: "CVV",
								type: "text",
								placeholder: "123",
							})}
							{renderInput({
								name: "cardPin",
								label: "Card PIN",
								type: "password",
								placeholder: "****",
							})}
						</div>
					</div>
					<DialogFooter>
						<Button
							type="submit"
							disabled={isPending}
						>
							Add Card
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default CreateCardForm;
