import apiClient from "@/lib/axios";
import { IResponse } from "@/types/auth";
import {
	Card,
	PaymentsResponse,
	TransactionsResponse,
	Wallet,
} from "@/types/wallet";
import { AxiosError } from "axios";

export async function getWalletDetails() {
	try {
		const res = await apiClient.get<IResponse<Wallet>>("/account/details");
		return res.data.data;
	} catch (error) {
		throw error as AxiosError;
	}
}

export async function getAllTransactions() {
	try {
		const res = await apiClient.get<IResponse<TransactionsResponse>>(
			"/account/transactions",
			{
				params: {
					page: 1,
					limit: 100,
				},
			}
		);
		return res.data.data;
	} catch (error) {
		throw error as AxiosError;
	}
}

export async function getAllPayments() {
	try {
		const res = await apiClient.get<IResponse<PaymentsResponse>>(
			"/account/payments",
			{
				params: {
					pageSize: 20,
					pageNumber: 0,
				},
			}
		);
		return res.data.data;
	} catch (error) {
		throw error as AxiosError;
	}
}

export async function verifyTransfer(referenceNumber: string) {
	try {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const res = await apiClient.get<IResponse<any>>("/account/verify", {
			params: {
				referenceNumber,
			},
		});
		return res.data.data;
	} catch (error) {
		throw error as AxiosError;
	}
}

export async function getAllCards() {
	try {
		const res = await apiClient.get<IResponse<Card[]>>("/account/card/all");
		return res.data.data;
	} catch (error) {
		throw error as AxiosError;
	}
}
