import { API_STATUS_CODES } from "@/constants/statusCodes";
import { IResponse } from "@/types/auth";
import axios, { AxiosError } from "axios";

const apiClient = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: true,
});

export default apiClient;

// Intreceptors for Error Handling
apiClient.interceptors.response.use(
	(response) => {
		console.log(response);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const data = response.data as IResponse<any>;
		if (
			data.statusCode === API_STATUS_CODES.NOT_FOUND ||
			data.statusCode === API_STATUS_CODES.STATUS_400
		) {
			throw new AxiosError(
				data.statusMessage,
				data.statusCode,
				response.config,
				response.request,
				response
			);
		}
		return response;
	},
	(error: AxiosError) => {
		return Promise.reject(error);
	}
);
