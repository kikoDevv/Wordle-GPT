import "./globals.css";
import type { Metadata } from "next";
import ThemeToggle from "../components/ThemeToggle";

export const metadata: Metadata = {
	title: "Wordle-GPT",
	description: "wordle game in chatGPT style",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<ThemeToggle />
				{children}
			</body>
		</html>
	);
}
