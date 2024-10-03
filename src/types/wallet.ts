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

export interface TransactionsResponse {
	totalPages: number;
	transactions: Transaction[];
}

export interface Payment {
	referenceNumber: string;
	amount: number;
	transactionType: string;
	transactionDateTime: string;
	currency: string;
	description: string;
	payrollName: string;
	employeeName: string;
}

export interface PaymentsResponse {
	totalPages: 0;
	pageSize: 0;
	payments: Payment[];
}

export interface Transfer {
	amount: number;
	amountExpected: number;
	referenceNumber: string;
	paymentReference: string;
	accountName: string;
	accountNumber: string;
	bankName: string;
	expiryDate: string;
}

export interface Card {
	cardNumber: string;
	expiryMonth: string;
	expiryYear: string;
	cvv: string;
	cardPin: string;
	cardId: number;
}

export interface FundCardResponse extends Card {
	amount: number;
}
