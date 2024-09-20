"use client";
import { useToast } from "@/hooks/use-toast";
import {
	MutationCache,
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AxiosError } from "axios";
import { useState } from "react";

declare module "@tanstack/react-query" {
	interface Register {
		defaultError: AxiosError;
	}
}

export default function ReactQueryClientProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const { toast } = useToast();

	const [client] = useState(
		new QueryClient({
			defaultOptions: {
				queries: {
					refetchOnWindowFocus: false,
					staleTime: 10 * 1000,
				},
			},
			mutationCache: new MutationCache({
				onError: (error) => {
					console.log(error);
					if (!error.response) {
						toast({
							variant: "destructive",
							title: "Network Error",
						});
					} else if (error.response.status === 400) {
						toast({
							variant: "destructive",
							title: "Invalid Credentials",
						});
					} else if (error.response.status === 401) {
						toast({
							variant: "destructive",
							title: "Unauthorized",
						});
					}
				},
			}),
		})
	);

	return (
		<QueryClientProvider client={client}>
			{children}
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}
