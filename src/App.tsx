import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import CreateCompany from "./pages/CreateCompany";
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./components/dashboard/MainLayout";
import Profile from "./pages/Profile";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Redirecting from "./pages/Redirecting";
import Employees from "./pages/Employees";
import CreateEmployeeForm from "./components/forms/CreateEmployeeForm";
import EmployeeTable from "./components/EmployeeTable";
import UpdateEmployeeForm from "./components/forms/UpdateEmployeeForm";
import Payroll from "./pages/Payroll";
import PayrollTable from "./components/payroll/PayrollTable";

// Desc: Main App component for the application.
function App() {
	const location = useLocation();
	return (
		<Routes>
			<Route
				path="/"
				element={
					<Navigate
						to="/dashboard"
						state={{ from: location }}
						replace
					/>
				}
			/>

			<Route
				path="login"
				element={<LoginPage />}
			/>

			<Route
				path="redirecting"
				element={<Redirecting />}
			/>

			<Route
				path="signup"
				element={<SignUpPage />}
			/>

			<Route
				path="/company/:employerId?"
				element={<CreateCompany />}
			/>

			{/* Dashboard Pages */}
			<Route
				path="dashboard"
				element={<ProtectedRoutes />}
			>
				<Route
					path=""
					element={<MainLayout />}
				>
					<Route
						path=""
						element={<Dashboard />}
					/>
					<Route
						path="profile"
						element={<Profile />}
					/>
					<Route
						path="employee"
						element={<Employees />}
					>
						<Route
							path=""
							element={<EmployeeTable />}
						/>
						<Route
							path=":employeeId"
							element={<UpdateEmployeeForm />}
						/>
						<Route
							path="create"
							element={<CreateEmployeeForm />}
						/>
					</Route>
				</Route>
				<Route
					path="payroll"
					element={<Payroll />}
				>
					<Route
						path=""
						element={<PayrollTable />}
					/>
				</Route>
			</Route>

			{/* 404 */}
			<Route
				path="*"
				element={<>404</>}
			/>
		</Routes>
	);
}

export default App;
