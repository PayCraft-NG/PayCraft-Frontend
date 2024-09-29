import apiClient from "@/lib/axios";
import { IResponse } from "@/types/auth";
import { Transaction, Wallet } from "@/types/wallet";
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
		const res = await apiClient.get<
			IResponse<{ totalPages: number; transactions: Transaction[] }>
		>("/account/transactions", {
			params: {
				page: 1,
				limit: 100,
			},
		});
		return res.data.data;
	} catch (error) {
		throw error as AxiosError;
	}
}
