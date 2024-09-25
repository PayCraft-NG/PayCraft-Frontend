import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.tsx";
import { Toaster } from "./components/ui/toaster.tsx";
import "./index.css";
import ReactQueryClientProvider from "./providers/ReactQueryProvider.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Router>
			<ReactQueryClientProvider>
				<App />
			</ReactQueryClientProvider>
			<Toaster />
		</Router>
	</StrictMode>
);
