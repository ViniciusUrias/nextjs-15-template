"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { authClient } from "@/lib/better-auth";
export default function SignInForm() {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);
		setError(null);

		const formData = new FormData(e.currentTarget);
		const email = formData.get("email")?.toString();
		const pw = formData.get("password")?.toString();
		if (!email || !pw) return;
		try {
			const { data, error } = await authClient.signIn.email(
				{
					email,
					password: pw,
					callbackURL: "/home",
				},
				{
					onError(context) {
						console.log(context);
					},
				}
			);

			if (error) {
				setError(error?.message);
			}
		} catch (err) {
			console.log(err);
			setError("An unexpected error occurred");
		} finally {
			setIsLoading(false);
		}
	};

	const signInWithDiscord = async () => {
		await authClient.signIn.social({
			provider: "discord",
			callbackURL: "http://localhost:5174/home/user",
		});
	};
	return (
		<Card className="w-1/2 md:w-1/3">
			<CardHeader className="text-center">
				<CardTitle className="text-2xl">Sign in</CardTitle>
				<CardDescription>Enter your username and password below to sign in to your account</CardDescription>
			</CardHeader>
			<CardContent className="">
				<form onSubmit={handleSubmit} className="space-y-2">
					<div className={"flex flex-col gap-6"}>
						<div className="space-y-2">
							<Label htmlFor="email">E-mail</Label>
							<Input id="email" name="email" type="email" required minLength={5} maxLength={100} />
						</div>
						<div>
							<div className="space-y-2">
								<Label htmlFor="password">Password</Label>
								<Input
									id="password"
									name="password"
									placeholder="********"
									required
									minLength={4}
									type="password"
									maxLength={100}
								/>
							</div>
							<Button variant="link" className="text-xs p-0">
								Forgot your password?
							</Button>
						</div>
						{error && <p className="text-sm text-red-500">{error}</p>}
						<Button type="submit" disabled={isLoading}>
							{isLoading ? <Loader className="animate-spin" /> : "Submit"}
						</Button>
					</div>
				</form>
				<div className="mt-2  flex flex-col items-center justify-between">
					<span className="font-medium text-muted-foreground">Don't have an account?</span>
					<Link className="mt-0 w-fit" href="/register">
						<Button variant="link">Register now</Button>
					</Link>
					<em className="text-muted-foreground">or</em>
					<span>(you need to configure discord social login in better-auth)</span>
					<Button disabled variant="outline" className="w-full mt-2" onClick={signInWithDiscord}>
						<svg
							className="w-6 h-6"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							fill="currentColor"
							viewBox="0 0 24 24"
						>
							<path d="M18.942 5.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.586 11.586 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3 17.392 17.392 0 0 0-2.868 11.662 15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.638 10.638 0 0 1-1.706-.83c.143-.106.283-.217.418-.331a11.664 11.664 0 0 0 10.118 0c.137.114.277.225.418.331-.544.328-1.116.606-1.71.832a12.58 12.58 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM8.678 14.813a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.929 1.929 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z" />
						</svg>
						Sign in with discord
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
