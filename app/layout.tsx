import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
	title: "Assistly AI",
	description: "Create your Custom Chatbot",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body className="min-h-screen flex">
					{children}

					{/* Toaster */}
				</body>
			</html>
		</ClerkProvider>
	);
}
