export const passwordRegex = new RegExp(
	"^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
);

export const phoneRegex = new RegExp("^$|[0-9]{13}");
