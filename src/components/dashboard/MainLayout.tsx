import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import FundWalletForm from "../forms/FundWalletForm";

const MainLayout = () => {
	return (
		<div className="flex min-h-screen w-full flex-col">
			<NavBar />
			<Outlet />
			<FundWalletForm />
		</div>
	);
};

export default MainLayout;
