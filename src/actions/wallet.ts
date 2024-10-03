import apiClient from "@/lib/axios";
import { IResponse } from "@/types/auth";
import { Transfer } from "@/types/wallet";
import { AxiosError } from "axios";

export async function fundWallet({ amount }: { amount: number }) {
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
