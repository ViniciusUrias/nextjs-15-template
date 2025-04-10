"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader } from "lucide-react";
import { useState } from "react";
import { authClient } from "@/lib/better-auth";
export default function SignUpForm() {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);
		setError(null);

		const formData = new FormData(e.currentTarget);
		const email = formData.get("email")?.toString();
		const pw = formData.get("password")?.toString();
		const name = formData.get("name")?.toString();
		if (!email || !pw) return;
		try {
			const { data, error } = await authClient.signUp.email({
				email,
				password: pw,
				name,
			});

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

	return (
		<Card className="w-1/2 md:w-1/3">
			<CardHeader className="text-center">
				<CardTitle className="text-2xl">Sign Up</CardTitle>
			</CardHeader>
			<CardContent className="w-full">
				<form onSubmit={handleSubmit} className="space-y-2">
					<div className={"flex flex-col gap-6"}>
						<div className="space-y-2">
							<Label htmlFor="name">Name</Label>
							<Input id="name" name="name" required minLength={5} maxLength={100} />
						</div>
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
						</div>
						{error && <p className="text-sm text-red-500">{error}</p>}
						<Button type="submit" disabled={isLoading}>
							{isLoading ? <Loader className="animate-spin" /> : "Submit"}
						</Button>
					</div>
				</form>
			</CardContent>
		</Card>
	);
}
