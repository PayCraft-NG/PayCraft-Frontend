import Container from "@/components/Container";
import MiniNav from "@/components/MiniNav";
import CompanyForm from "@/components/forms/CompanyForm";
import AuthLayout from "@/layout/AuthLayout";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";

const pages = [{ title: "Setup a Company" }, { title: "Company Info" }];

const CreateCompany = () => {
	const [currentPage, setCurrentPage] = useState(0);
	const { employerId } = useParams();

	if (!employerId) {
		console.log("No employerId, redirecting to signup");
		return (
			<Navigate
				to="/signup"
				replace
			/>
		);
	}

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
						<CompanyForm
							employerId={employerId}
							currentPage={currentPage}
							setPage={setCurrentPage}
						/>
					</AnimatePresence>
				</div>
			</Container>
		</AuthLayout>
	);
};

export default CreateCompany;
