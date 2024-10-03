import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import MainLayout from "./components/dashboard/MainLayout";
import EmployeeTable from "./components/EmployeeTable";
import CreateEmployeeForm from "./components/forms/CreateEmployeeForm";
import CreatePayrollForm from "./components/forms/CreatePayrollForm";
import UpdateEmployeeForm from "./components/forms/UpdateEmployeeForm";
import PayrollEmployeeTable from "./components/payroll/PayrollEmployeeTable";
import PayrollTable from "./components/payroll/PayrollTable";
import ProtectedRoutes from "./components/ProtectedRoutes";
import CreateCompany from "./pages/CreateCompany";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import LoginPage from "./pages/Login";
import Payroll from "./pages/Payroll";
import Profile from "./pages/Profile";
import Redirecting from "./pages/Redirecting";
import SignUpPage from "./pages/SignUp";
import UpdatePayrollForm from "./components/forms/UpdatePayrollForm";
import NotFoundPage from "./pages/NotFound";

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
				path="company/create"
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
							path=":employeeId?"
							element={<UpdateEmployeeForm />}
						/>
						<Route
							path="create"
							element={<CreateEmployeeForm />}
						/>
					</Route>
					<Route
						path="payroll"
						element={<Payroll />}
					>
						<Route
							path=""
							element={<PayrollTable />}
						/>
						<Route
							path="create"
							element={<CreatePayrollForm />}
						/>
						<Route
							path=":payrollId?"
							element={
								<div className="grid gap-y-7">
									<UpdatePayrollForm />
									<PayrollEmployeeTable />
								</div>
							}
						/>
					</Route>
				</Route>
			</Route>

			{/* 404 */}
			<Route
				path="*"
				element={<NotFoundPage />}
			/>
		</Routes>
	);
}

export default App;
