import Container from "@/components/Container";
import MiniNav from "@/components/MiniNav";
import EmployerForm from "@/components/forms/EmployerForm";
import AuthLayout from "@/layout/AuthLayout";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";

const pages = [
	{ title: "Create an Account" },
	{ title: "Personal Info" },
	// { title: "Setup a Company" },
	// { title: "Company Info" },
];

const SignUpPage = () => {
	const [currentPage, setCurrentPage] = useState(0);
	return (
		<AuthLayout>
			<Container className="mt-11 sm:mb-14 flex justify-center">
				<div className="lg:mx-20 w-full shrink-0">
					<MiniNav
						pages={pages}
						currentPage={currentPage}
						setPage={setCurrentPage}
					/>
					<AnimatePresence mode="popLayout">
						<EmployerForm
							currentPage={currentPage}
							setPage={setCurrentPage}
						/>
						{/* <CompanyForm
							currentPage={currentPage}
							setPage={setCurrentPage}
						/> */}
					</AnimatePresence>
				</div>
			</Container>
		</AuthLayout>
	);
};

export default SignUpPage;
