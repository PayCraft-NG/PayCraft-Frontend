import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const MainLayout = () => {
	return (
		<div className="flex min-h-screen w-full flex-col">
			<NavBar />
			<Outlet />
		</div>
	);
};

export default MainLayout;
