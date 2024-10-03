import { useFundWallet } from "@/hooks/wallet/useFundWallet";
import { formatNumber } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle } from "lucide-react";
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

const schema = z.object({
	amount: z.coerce
		.number({ message: "Invalid Number" })
		.int({ message: "Must be a whole number" })
		.positive({ message: "Must be greater than 0" }),
});

type FundWalletForm = z.infer<typeof schema>;

const FundWalletForm = () => {
	const [isOpen, setIsOpen] = useState(false);

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

	const { mutate: fundWallet, isPending } = useFundWallet();

	const onSubmit = (data: FundWalletForm) => {
		console.log(data);
		fundWallet(data, {
			onSettled: () => setIsOpen(false),
		});
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
				<DialogContent
					className="sm:max-w-[425px]"
					onPointerDownOutside={(e) => e.preventDefault()}
				>
					<DialogHeader>
						<DialogTitle>Fund Your Wallet</DialogTitle>
						<DialogDescription>
							Enter the amount you'd like to add to your wallet.
						</DialogDescription>
					</DialogHeader>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="py-4">
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
						</div>
						<DialogFooter>
							<Button
								disabled={isPending}
								type="submit"
							>
								Fund Wallet
							</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default FundWalletForm;
