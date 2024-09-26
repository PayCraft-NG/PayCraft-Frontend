import { useRefreshToken } from "@/hooks/useRefreshToken";
import { useAuth } from "@/store/auth";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoutes = () => {
	const accessToken = useAuth();
	const location = useLocation();
	const [cookie] = useCookies(["refresh_token"]);

	const { mutate: refreshToken } = useRefreshToken();

	useEffect(() => {
		if (cookie.refresh_token) {
			refreshToken({ refreshToken: cookie.refresh_token });
		}
	}, []);

	return accessToken ? (
		<Outlet />
	) : (
		<Navigate
			to="/login"
			state={{ from: location }}
			replace
		/>
	);
};

export default ProtectedRoutes;
