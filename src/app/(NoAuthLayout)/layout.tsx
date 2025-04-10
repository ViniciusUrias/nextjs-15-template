import React from "react";

export default function NoAuthLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex items-center justify-center bg-linear-90  from-indigo-900  to-secondary m-auto h-[100dvh] w-full">
			{children}
		</div>
	);
}
