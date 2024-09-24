import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import CreateCompany from "./pages/CreateCompany";
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/SignUp";

// Desc: Main App component for the application.
function App() {
	const location = useLocation();
	return (
		<Routes>
			<Route path="/">
				<Route
					path="/"
					element={
						<Navigate
							to="/login"
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
					path="signup"
					element={<SignUpPage />}
				/>

				<Route
					path="/company/:employerId?"
					element={<CreateCompany />}
				/>

				<Route
					path="dashboard"
					element={<h1>Dashboard</h1>}
				/>

				{/* 404 */}
				<Route
					path="*"
					element={<>404</>}
				/>
			</Route>
		</Routes>
	);
}

export default App;
