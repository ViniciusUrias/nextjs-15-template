import { getSession } from "@/lib/auth";
export default async function HomePage() {
	const user = await getSession();

	return (
		<div>
			<span>{JSON.stringify(user, null, 4)}</span>
		</div>
	);
}
