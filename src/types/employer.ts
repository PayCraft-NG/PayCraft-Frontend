export interface Employer {
	firstName: string;
	lastName: string;
	emailAddress: string;
	phoneNumber: string;
	streetAddress: string;
	jobTitle: string;
	bvn: string;
	employerId: string;
}

export interface Company {
	companyName: string;
	companyEmailAddress: string;
	companyPhoneNumber: string;
	companyId: string;
	employerDTO: Omit<Employer, "employerId">;
}

export interface Employee {
	employeeId: string;
	companyId: string;
	firstName: string;
	lastName: string;
	emailAddress: string;
	dateOfBirth: Date;
	streetAddress: string;
	phoneNumber: string;
	jobTitle: string;
	department: string;
	bankName: string;
	accountNumber: string;
	salaryAmount: number;
	salaryCurrency: string;
}
