import CreateCardForm from "@/components/forms/CreateCardForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useAllCards } from "@/hooks/wallet/useAllCards";
import { useRemoveCard } from "@/hooks/wallet/useRemoveCard";
import { Loader2, Trash2 } from "lucide-react";

const Cards = () => {
	const { data: cards, isPending } = useAllCards();

	const { mutate: removeCard, isPending: isDeleting } = useRemoveCard();

	if (isPending) {
		return (
			<div className="flex flex-col items-center justify-center pt-20">
				<Loader2 className="size-14 lg:size-16 animate-spin text-primary" />
				<h1 className="mt-4 text-lg lg:text-xl font-semibold text-foreground">
					Getting All Cards
				</h1>
			</div>
		);
	}

	return (
		<main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
			<Card className="col-span-4 mt-8">
				<CardHeader>
					<div className="flex items-center justify-between">
						<CardTitle className="text-3xl font-semibold">Your Cards</CardTitle>
						<CreateCardForm />
					</div>
				</CardHeader>
				<CardContent>
					{cards && cards.length > 0 ? (
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>S/N</TableHead>
									<TableHead>Card Number</TableHead>
									<TableHead>Expiry Date</TableHead>
									<TableHead>Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{cards.map((card, index) => (
									<TableRow key={card.cardId}>
										<TableCell>{index + 1}</TableCell>
										<TableCell>{card.cardNumber}</TableCell>
										<TableCell>{`${card.expiryMonth}/${card.expiryYear}`}</TableCell>
										<TableCell>
											<Button
												variant="destructive"
												size="sm"
												disabled={isDeleting}
												onClick={() => removeCard(card.cardId)}
											>
												<Trash2 className="mr-2 h-4 w-4" />
												Remove
											</Button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					) : (
						<h1 className="mt-4 text-lg lg:text-xl font-semibold text-foreground">
							No Cards Found
						</h1>
					)}
				</CardContent>
			</Card>
		</main>
	);
};

export default Cards;
