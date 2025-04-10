// src/context/auth-context.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { authClient } from "@/lib/better-auth";
import { type User } from "better-auth";

type AuthContextType = {
	user: User | null;
	isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({
	user: null,
	isLoading: true,
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children, initialUser }: { children: React.ReactNode; initialUser?: User | null }) {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(!initialUser);

	// Hydrate client-side with server-side data
	useEffect(() => {
		if (user?.id) return;
		if (initialUser) {
			setUser(initialUser);
			setIsLoading(false);
		} else {
			// If no initial user, check session
			checkSession();
		}
	}, [initialUser, user]);

	const checkSession = async () => {
		try {
			const response = await authClient.getSession();
			const userData = response.data?.user;
			setUser(userData as User);
		} catch (error) {
			console.error("Session check failed:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return <AuthContext.Provider value={{ user, isLoading }}>{children}</AuthContext.Provider>;
}
