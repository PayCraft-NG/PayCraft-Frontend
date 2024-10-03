import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
			<Card className="w-full max-w-md">
				<CardHeader>
					<div className="flex items-center justify-center mb-4">
						<AlertTriangle className="h-12 w-12 text-yellow-500" />
					</div>
					<CardTitle className="text-2xl font-bold text-center">
						404 - Page Not Found
					</CardTitle>
					<CardDescription className="text-center">
						Oops! The page you're looking for doesn't exist.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<p className="text-center text-gray-600">
						It seems you've ventured into uncharted territory. Don't worry, it
						happens to the best of us!
					</p>
				</CardContent>
				<CardFooter className="flex justify-center">
					<Button asChild>
						<Link to="/dashboard">Return to Dashboard</Link>
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
};

export default NotFoundPage;
