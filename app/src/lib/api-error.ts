export class APIError extends Error {
	constructor(
		public statusCode: number,
		message: string,
		public code?: string,
		public details?: any,
	) {
		super(message);
		this.name = "APIError";
	}
}
