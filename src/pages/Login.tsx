import { Link } from "react-router-dom";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../components/ui/card";
import LoginForm from "@/components/forms/LoginForm";

function LoginPage() {
	return (
		<section className="flex justify-center items-center h-screen">
			<Card className="w-full max-w-lg shadow-none border-none lg:shadow lg:border">
				<CardHeader>
					<CardTitle className="text-3xl">Login to your Account</CardTitle>
					<CardDescription>Please enter your details</CardDescription>
				</CardHeader>
				<CardContent>
					<LoginForm />
				</CardContent>
				<CardFooter className="justify-center">
					<p className="text-center text-sm">
						Don’t have an account?{" "}
						<Link
							to="/signup"
							className="font-semibold"
						>
							Sign up
						</Link>
					</p>
				</CardFooter>
			</Card>
		</section>
	);
}

export default LoginPage;
