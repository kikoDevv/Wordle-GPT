import "./globals.css";
import type { Metadata } from "next";
import Sidebar from "@/UI/sidebar/Sidebar";

export const metadata: Metadata = {
  title: "Wordle-GPT",
  description: "wordle game in chatGPT style",
  icons: {
    icon: "/wordle.png",
    shortcut: "/wordle.png",
    apple: "/wordle.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex">
          <Sidebar />
          {children}
        </div>
      </body>
    </html>
  );
}
