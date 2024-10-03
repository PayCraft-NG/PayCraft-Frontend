import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAllCards } from "@/hooks/wallet/useAllCards";
import { useCardPayment } from "@/hooks/wallet/useCardPayment";
import { useTransfer } from "@/hooks/wallet/useTransfer";
import { formatNumber } from "@/lib/utils";
import { FundCardResponse } from "@/types/wallet";
import { zodResolver } from "@hookform/resolvers/zod";
import { Banknote, CreditCard, PlusCircle } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
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
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";

const schema = z.object({
	amount: z.coerce
		.number({ message: "Invalid Number" })
		.int({ message: "Must be a whole number" })
		.positive({ message: "Must be greater than 0" }),
	cardId: z.number().optional(),
});

type FundWalletForm = z.infer<typeof schema>;

const FundWalletForm = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [paymentMethod, setPaymentMethod] = useState<"transfer" | "card">(
		"transfer"
	);

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FundWalletForm>({
		mode: "onChange",
		resolver: zodResolver(schema),
		defaultValues: {
			amount: 20,
		},
	});

	const { data: cards, isPending: cardsLoading } = useAllCards();

	const { mutate: transferFund, isPending: isTransferring } = useTransfer();
	const { mutate: cardFund, isPending: isCardPaying } = useCardPayment();

	const onSubmit = (data: FundWalletForm) => {
		console.log(data);
		const selectedCard = cards?.filter((card) => card.cardId === data.cardId);
		const payload = {
			...selectedCard,
			amount: data.amount,
		} as FundCardResponse;

		if (paymentMethod === "card") {
			cardFund(payload, {
				onSettled: () => setIsOpen(false),
			});
		} else {
			transferFund(data.amount, {
				onSettled: () => setIsOpen(false),
			});
		}
	};

	return (
		<div className="fixed bottom-10 right-4 z-10">
			<Dialog
				open={isOpen}
				onOpenChange={setIsOpen}
			>
				<DialogTrigger asChild>
					<Button
						size="lg"
						className="shadow-lg hover:shadow-xl transition-shadow duration-300"
					>
						<PlusCircle className="mr-2 h-4 w-4" />
						Fund Wallet
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Make a Payment</DialogTitle>
						<DialogDescription>
							Choose your payment method and enter the details below.
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<RadioGroup
							value={paymentMethod}
							onValueChange={(value: string) =>
								setPaymentMethod(value as "transfer" | "card")
							}
							className="grid grid-cols-2 gap-4"
						>
							<div>
								<RadioGroupItem
									value="card"
									id="card"
									className="peer sr-only"
								/>
								<Label
									htmlFor="card"
									className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
								>
									<CreditCard className="mb-3 h-6 w-6" />
									Card
								</Label>
							</div>
							<div>
								<RadioGroupItem
									value="transfer"
									id="transfer"
									className="peer sr-only"
								/>
								<Label
									htmlFor="transfer"
									className="flex flex-col cursor-pointer items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
								>
									<Banknote className="mb-3 h-6 w-6" />
									Transfer
								</Label>
							</div>
						</RadioGroup>
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className="items-center gap-4">
								<Label
									htmlFor="amount"
									className="text-right"
								>
									Amount
								</Label>
								<div>
									<Controller
										name="amount"
										control={control}
										render={({ field }) => (
											<Input
												{...field}
												value={formatNumber(field.value)}
												onChange={(e) => {
													field.onChange(e.target.value.replace(/\D/g, ""));
												}}
												id="amount"
												type="text"
												placeholder="Enter amount"
												className="my-1 text-base"
											/>
										)}
									/>
									{errors.amount && (
										<p className="text-red-500 font-medium text-xs text-wrap">
											{errors.amount?.message}
										</p>
									)}
								</div>
							</div>
							{paymentMethod === "card" && (
								<div className="items-center gap-4">
									<Label
										htmlFor="cardId"
										className="text-right"
									>
										Card
									</Label>
									<div>
										<Controller
											name="cardId"
											control={control}
											render={({ field }) => (
												<Select
													{...field}
													value={field.value?.toString()}
													onValueChange={field.onChange}
												>
													<SelectTrigger className="my-1 text-sm">
														<SelectValue placeholder="Select your Card" />
													</SelectTrigger>
													<SelectContent>
														{cardsLoading ? (
															<SelectItem
																value="loading"
																disabled
															>
																Loading...
															</SelectItem>
														) : cards && cards.length > 0 ? (
															cards.map((card) => (
																<SelectItem
																	key={card.cardId}
																	value={card.cardId.toString()}
																	className="text-sm"
																>
																	{`${card.cardNumber}  (Expires:${card.expiryMonth}/${card.expiryYear})`}
																</SelectItem>
															))
														) : (
															<SelectItem
																value="No Options"
																disabled
															>
																No options available
															</SelectItem>
														)}
													</SelectContent>
												</Select>
											)}
										/>
										{errors.amount && (
											<p className="text-red-500 font-medium text-xs text-wrap">
												{errors.amount?.message}
											</p>
										)}
									</div>
								</div>
							)}
							<DialogFooter>
								<Button
									disabled={isCardPaying || isTransferring || cardsLoading}
									type="submit"
									className="mt-2"
								>
									Pay Now
								</Button>
							</DialogFooter>
						</form>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default FundWalletForm;
