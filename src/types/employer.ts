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
