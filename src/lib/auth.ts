import { betterAuth } from "better-auth";
import Database from "better-sqlite3";
import { nextCookies } from "better-auth/next-js";
import { headers } from "next/headers";

export const auth = betterAuth({
	database: new Database("database.sqlite"),
	emailAndPassword: { enabled: true },
	trustedOrigins: ["http://localhost:5174", "http://localhost:5173"],
	plugins: [nextCookies()], // make sure this is the last plugin in the array
});

export const getSession = async () => await auth.api.getSession({ headers: await headers() });
