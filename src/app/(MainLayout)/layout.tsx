import Header from "@/components/header";
import { auth } from "@/lib/auth";
import { AuthProvider } from "@/providers/auth-provider";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export default async function MainLayout({ children }: { children: React.ReactNode }) {
	const session = await auth.api.getSession({ headers: await headers() });
	if (!session?.session.id) return redirect("/sign-in");
	const { user } = session;
	return (
		<div className="bg-primary-foreground h-screen w-screen overflow-y-auto">
			<AuthProvider initialUser={user || null}>
				<Header />
				<main className="m-2 rounded-md flex flex-col  overflow-x-hidden sm:mx-20 p-4 ">{children}</main>
			</AuthProvider>
		</div>
	);
}
