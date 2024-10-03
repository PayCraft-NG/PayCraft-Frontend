import { CardForm } from "@/components/forms/CreateCardForm";
import apiClient from "@/lib/axios";
import { IResponse } from "@/types/auth";
import { Card, FundCardResponse, Transfer } from "@/types/wallet";
import { AxiosError } from "axios";

export async function fundViaTransfer(amount: number) {
	try {
		const res = await apiClient.post<IResponse<Transfer>>(
			"/account/transfer",
			null,
			{
				params: { amount },
			}
		);
		return res.data;
	} catch (error) {
		throw error as AxiosError;
	}
}

export async function createCard(payload: CardForm) {
	try {
		const res = await apiClient.post<IResponse<Card>>(
			"/account/card/add",
			payload
		);
		return res.data;
	} catch (error) {
		throw error as AxiosError;
	}
}

export async function removeCard(cardId: number) {
	try {
		const res = await apiClient.delete<IResponse>("/account/card/delete", {
			params: { cardId },
		});
		return res.data;
	} catch (error) {
		throw error as AxiosError;
	}
}

export async function fundViaCard(payload: FundCardResponse) {
	try {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const res = await apiClient.post<IResponse<any>>(
			"/account/fund-card",
			payload
		);
		return res.data;
	} catch (error) {
		throw error as AxiosError;
	}
}
