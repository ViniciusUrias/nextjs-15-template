"use client";

import { MenuIcon, ShirtIcon } from "lucide-react";
import { ModeToggle } from "./mode-toogle";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { authClient } from "@/lib/better-auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function Header() {
	const { data, isPending } = authClient.useSession();
	const router = useRouter();

	return (
		<header className="bg-background sm:h-12 w-full flex  items-center shadow-md shadow-background p-4 justify-between">
			<Sheet>
				<SheetTrigger asChild>
					<Button variant="outline" size="icon" className="sm:hidden">
						<MenuIcon className="h-6 w-6" />
						<span className="sr-only">Toggle navigation menu</span>
					</Button>
				</SheetTrigger>
				<SheetContent side="left">
					<Link href="#">
						<ShirtIcon className="h-6 w-6" />
						<span className="sr-only">ShadCN</span>
					</Link>
					<div className="grid gap-2 py-6">
						<Link aria-label="Go to home page" href="/home">
							Home
						</Link>
						<Link href="/home/servers">My servers</Link>
						<Link href="/users/profile">My Profile</Link>
					</div>
				</SheetContent>
			</Sheet>
			<nav className="items-center gap-4 hidden sm:flex text-lg">
				{/* <Image className="aspect-square h-8 rounded-full hidden sm:block mr-2" src={logo} alt="Logo image" /> */}
				<Link aria-label="Go to home page" href="/home">
					Home
				</Link>
			</nav>

			<div className="items-center flex gap-2">
				<h2>Hi, {data?.user?.name}</h2>
				<Button
					onClick={() => authClient.signOut({ fetchOptions: { onSuccess: () => router.push("/sign-in") } })}
					variant="outline"
				>
					Logout
				</Button>
				<ModeToggle />
			</div>
		</header>
	);
}
