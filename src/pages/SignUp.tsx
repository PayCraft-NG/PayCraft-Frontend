import MiniNav from "@/components/MiniNav";
import SignUpForm from "@/components/forms/SignUpForm";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { Link } from "react-router-dom";

const SignUpPage = () => {
	const [page, setPage] = useState(1);

	return (
		<section className="flex justify-center items-center h-screen">
			<Card className="w-full max-w-xl shadow-none border-none lg:shadow lg:border">
				<CardHeader className="text-center pb-3">
					<CardTitle className="text-4xl">Create an Account</CardTitle>
					<CardDescription className="text-base">
						Please enter your details
					</CardDescription>
					<MiniNav
						pages={[1, 2]}
						currentPage={page}
						setPage={setPage}
					/>
				</CardHeader>
				<CardContent>
					<SignUpForm
						currentPage={page}
						setPage={setPage}
					/>
				</CardContent>
				<CardFooter className="justify-center">
					<p className="text-center text-sm">
						Already have an account?{" "}
						<Link
							to="/login"
							className="font-semibold"
						>
							Login
						</Link>
					</p>
				</CardFooter>
			</Card>
		</section>
	);
};

export default SignUpPage;
