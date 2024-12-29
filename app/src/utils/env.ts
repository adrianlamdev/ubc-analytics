const requiredEnvs = ["NEXT_PUBLIC_API_URL", "DATABASE_URL"] as const;
// utils/env.ts
export function validateEnv() {
	for (const env of requiredEnvs) {
		if (!process.env[env]) {
			throw new Error(`Missing required environment variable: ${env}`);
		}
	}
}
