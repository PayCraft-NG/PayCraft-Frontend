"use client";
import { useToast } from "@/hooks/use-toast";
import { APIError, IResponse, ServerError } from "@/types/auth";
import {
	MutationCache,
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AxiosError } from "axios";
import { useState } from "react";

// Extend the Register interface
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
					if (error instanceof AxiosError) {
						if (!error.response) {
							toast({
								variant: "destructive",
								title: "Network Error",
								description: "Please check your internet connection.",
							});
						} else {
							const errorResponse = error.response.data as APIError;

							if ("apiPath" in errorResponse) {
								// This is a ServerError
								const serverError = errorResponse as ServerError;
								toast({
									variant: "destructive",
									title: "Server Error",
									description: serverError.errorMsg,
								});
							} else {
								// This is a Validation Error (IResponse)
								const clientError = errorResponse as IResponse<
									Record<string, string>
								>;
								toast({
									variant: "destructive",
									title: "Validation Error",
									description: clientError.statusMessage,
								});
							}
						}
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
