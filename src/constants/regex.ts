export const PasswordRegex = new RegExp(
	"^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
);

export const PhoneRegex = new RegExp("^$|[0-9]{13}");

export const BankAccountRegex = new RegExp("(^$|[0-9]{10})");
