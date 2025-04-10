"use server";
import { cookies } from "next/headers";
const API_URL = process.env.NEXT_PUBLIC_API_URL;
export async function apiClient(endpoint: string, options?: RequestInit) {
	const ck = await cookies();
	const sessionToken = ck.get("better-auth.session_token")?.value;

	const headers = {
		...options?.headers,
		...(sessionToken ? { Cookie: `better-auth.session_token=${sessionToken}` } : {}),
	};

	const response = await fetch(`${API_URL}${endpoint}`, {
		...options,
		headers,
		credentials: "include",
	});

	return response;
}
