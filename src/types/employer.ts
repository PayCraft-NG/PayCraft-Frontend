export interface Employer {
	firstName: string;
	lastName: string;
	emailAddress: string;
	employerId: string;
}

export interface Company {
	companyName: string;
	companyEmailAddress: string;
	companyPhoneNumber: string;
	companyId: string;
	employerDTO: Omit<Employer, "employerId">;
}
