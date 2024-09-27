import { useAuth } from "@/store/auth";
import { useCookies } from "react-cookie";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoutes = () => {
	const accessToken = useAuth();
	const location = useLocation();
	const [cookies] = useCookies(["refresh_token"]);

	// If there's an access token, allow access to protected routes
	if (accessToken) {
		return <Outlet />;
	}

	// If there's a refresh token cookie and we're attempting to refresh, show loading screen
	if (!accessToken && cookies?.refresh_token) {
		return (
			<Navigate
				to="/redirecting"
				state={{ from: location }}
				replace
			/>
		);
	}

	// If there's no refresh token cookie or refresh attempt has failed, redirect to login
	return (
		<Navigate
			to="/login"
			state={{ from: location }}
			replace
		/>
	);
};

export default ProtectedRoutes;
