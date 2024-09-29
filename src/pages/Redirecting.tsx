import { useRefreshToken } from "@/hooks/useRefreshToken";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { Navigate, useLocation } from "react-router-dom";

const Redirecting = () => {
	const { mutateAsync: refreshToken } = useRefreshToken();
	const [cookie] = useCookies(["refresh_token"]);
	const location = useLocation();

	useEffect(() => {
		refreshToken({ refreshToken: cookie.refresh_token });
	}, []);

	if (!cookie.refresh_token)
		return (
			<Navigate
				to="/login"
				state={{ from: location }}
				replace
			/>
		);

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-background">
			<Loader2 className="h-16 w-16 animate-spin text-primary" />
			<h1 className="mt-4 text-2xl font-semibold text-foreground">
				Refreshing your session...
			</h1>
			<p className="mt-2 text-muted-foreground">
				Please wait while we securely log you in.
			</p>
		</div>
	);
};

export default Redirecting;
