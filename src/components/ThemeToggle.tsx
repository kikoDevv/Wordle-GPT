"use client";

import { useState, useEffect } from "react";

export default function ThemeToggle() {
	const [theme, setTheme] = useState<"light" | "dark">("light");

	useEffect(() => {
		// Get stored theme or default to light
		const storedTheme =
			(localStorage.getItem("theme") as "light" | "dark") || "light";
		setTheme(storedTheme);
		applyTheme(storedTheme);
	}, []);

	const applyTheme = (newTheme: "light" | "dark") => {
		const html = document.documentElement;
		html.setAttribute("data-theme", newTheme);
	};

	const toggleTheme = () => {
		const nextTheme = theme === "light" ? "dark" : "light";
		setTheme(nextTheme);
		localStorage.setItem("theme", nextTheme);
		applyTheme(nextTheme);
	};

	return (
		<div className="fixed top-4 right-4">
			<button
				onClick={toggleTheme}
				className="relative inline-flex items-center h-8 w-16 rounded-full transition-all duration-300 hover:cursor-pointer"
				style={{
					backgroundColor: theme === "dark" ? "#374151" : "#e5e7eb",
				}}
			>
				{/* Toggle Circle */}
				<span
					className={`inline-block h-6 w-6 rounded-full transition-all duration-300 transform ${
						theme === "dark" ? "translate-x-9" : "translate-x-1"
					}`}
					style={{
						backgroundColor: theme === "dark" ? "#1e293b" : "#f59e0b",
						boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
					}}
				>
					{/* Icon inside the circle */}
					<span className="flex items-center justify-center h-full text-xs">
						{theme === "dark" ? "🌙" : "☀️"}
					</span>
				</span>
			</button>
		</div>
	);
}
