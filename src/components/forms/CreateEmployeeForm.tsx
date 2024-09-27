import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const CreateEmployeeForm = () => {
	return (
		<form>
			<div className="grid gap-4 py-4">
				<div className="grid grid-cols-4 items-center gap-4">
					<Label
						htmlFor="firstName"
						className="text-right"
					>
						First Name
					</Label>
					<Input
						id="firstName"
						name="firstName"
						className="col-span-3"
					/>
				</div>
				<div className="grid grid-cols-4 items-center gap-4">
					<Label
						htmlFor="lastName"
						className="text-right"
					>
						Last Name
					</Label>
					<Input
						id="lastName"
						name="lastName"
						className="col-span-3"
					/>
				</div>
				<div className="grid grid-cols-4 items-center gap-4">
					<Label
						htmlFor="emailAddress"
						className="text-right"
					>
						Email
					</Label>
					<Input
						id="emailAddress"
						name="emailAddress"
						type="email"
						className="col-span-3"
					/>
				</div>
				<div className="grid grid-cols-4 items-center gap-4">
					<Label
						htmlFor="dateOfBirth"
						className="text-right"
					>
						Date of Birth
					</Label>
					<Input
						id="dateOfBirth"
						name="dateOfBirth"
						type="date"
						className="col-span-3"
					/>
				</div>
				<div className="grid grid-cols-4 items-center gap-4">
					<Label
						htmlFor="streetAddress"
						className="text-right"
					>
						Address
					</Label>
					<Input
						id="streetAddress"
						name="streetAddress"
						className="col-span-3"
					/>
				</div>
				<div className="grid grid-cols-4 items-center gap-4">
					<Label
						htmlFor="phoneNumber"
						className="text-right"
					>
						Phone
					</Label>
					<Input
						id="phoneNumber"
						name="phoneNumber"
						className="col-span-3"
					/>
				</div>
				<div className="grid grid-cols-4 items-center gap-4">
					<Label
						htmlFor="jobTitle"
						className="text-right"
					>
						Job Title
					</Label>
					<Input
						id="jobTitle"
						name="jobTitle"
						className="col-span-3"
					/>
				</div>
				<div className="grid grid-cols-4 items-center gap-4">
					<Label
						htmlFor="department"
						className="text-right"
					>
						Department
					</Label>
					<Input
						id="department"
						name="department"
						className="col-span-3"
					/>
				</div>
				<div className="grid grid-cols-4 items-center gap-4">
					<Label
						htmlFor="bvn"
						className="text-right"
					>
						BVN
					</Label>
					<Input
						id="bvn"
						name="bvn"
						className="col-span-3"
					/>
				</div>
				<div className="grid grid-cols-4 items-center gap-4">
					<Label
						htmlFor="bankName"
						className="text-right"
					>
						Bank Name
					</Label>
					<Input
						id="bankName"
						name="bankName"
						className="col-span-3"
					/>
				</div>
				<div className="grid grid-cols-4 items-center gap-4">
					<Label
						htmlFor="accountNumber"
						className="text-right"
					>
						Account Number
					</Label>
					<Input
						id="accountNumber"
						name="accountNumber"
						className="col-span-3"
					/>
				</div>
				<div className="grid grid-cols-4 items-center gap-4">
					<Label
						htmlFor="salaryAmount"
						className="text-right"
					>
						Salary Amount
					</Label>
					<Input
						id="salaryAmount"
						name="salaryAmount"
						type="number"
						className="col-span-3"
					/>
				</div>
				<div className="grid grid-cols-4 items-center gap-4">
					<Label
						htmlFor="salaryCurrency"
						className="text-right"
					>
						Salary Currency
					</Label>
					<Input
						id="salaryCurrency"
						name="salaryCurrency"
						className="col-span-3"
					/>
				</div>
			</div>
			<Button type="submit">Save Employee</Button>
		</form>
	);
};

export default CreateEmployeeForm;
