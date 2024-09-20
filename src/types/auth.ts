export interface IResponse<T> {
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
