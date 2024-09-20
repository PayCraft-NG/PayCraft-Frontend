import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import LoginPage from "./pages/Login";

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
