import { formatNumber } from "@/lib/utils";
import { Wallet as IWallet } from "@/types/wallet";
import { Activity, Building, CreditCard, Wallet } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import { Skeleton } from "../ui/skeleton";

interface Props {
	wallet?: IWallet;
}

const WalletDetails = ({ wallet }: Props) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Card>
			<Dialog
				open={!!wallet && isOpen}
				onOpenChange={setIsOpen}
			>
				<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
					<CardTitle className="text-sm font-medium">
						Total Wallet Amount
					</CardTitle>
					<DialogTrigger asChild>
						<Button
							variant="ghost"
							className="w-fit"
						>
							<Wallet className="h-4 w-4 text-muted-foreground" />
						</Button>
					</DialogTrigger>
				</CardHeader>
				<CardContent>
					{wallet ? (
						<span className="text-2xl font-bold">
							{wallet?.currency + formatNumber(wallet?.balance)}
						</span>
					) : (
						<Skeleton className="h-10 w-[60%] rounded-sm" />
					)}
				</CardContent>
				<DialogContent className="sm:max-w-[600px]">
					<DialogHeader>
						<DialogTitle>Wallet Information</DialogTitle>
						<DialogDescription>
							Here's a summary of your wallet details.
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4 py-4 sm:grid-cols-2">
						<Card>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">
									Account Number
								</CardTitle>
								<CreditCard className="h-4 w-4 text-muted-foreground" />
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">
									{wallet?.accountNumber}
								</div>
							</CardContent>
						</Card>
						<Card>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">Bank Name</CardTitle>
								<Building className="h-4 w-4 text-muted-foreground" />
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">{wallet?.bankName}</div>
							</CardContent>
						</Card>
						<Card>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">
									Account Status
								</CardTitle>
								<Activity className="h-4 w-4 text-muted-foreground" />
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold capitalize">
									{wallet?.accountStatus}
								</div>
							</CardContent>
						</Card>
					</div>
				</DialogContent>
			</Dialog>
		</Card>
	);
};

export default WalletDetails;
