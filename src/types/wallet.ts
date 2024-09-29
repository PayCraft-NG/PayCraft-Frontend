export interface Wallet {
	virtualAccountId: string;
	accountNumber: string;
	balance: number;
	bankCode: string;
	bankName: string;
	accountStatus: string;
	currency: string;
	employerId: string;
}

export interface Transaction {
	payerAccountNumber: string;
	payerAccountName: string;
	payerBankName: string;
	reference: string;
	status: string;
	amount: string;
	fee: string;
	currency: string;
	description: string;
}
