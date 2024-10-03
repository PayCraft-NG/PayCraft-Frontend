export interface IResponse<T = null> {
	statusCode: string;
	statusMessage: string;
	data: T;
}

export interface LoginResponse {
	accessToken: string;
	refreshToken: string;
	issuedAt: Date;
	accessTokenValidityTime: string;
	refreshTokenValidityTime: string;
}

export interface ServerError {
	apiPath: string;
	errorCode: string;
	errorMsg: string;
	errorTime: string;
}

export type APIError =
	| IResponse
	| IResponse<Record<string, string>>
	| ServerError;
