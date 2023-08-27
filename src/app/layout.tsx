import { ReduxProvider } from "@/redux/provider";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { UserProvider } from "@auth0/nextjs-auth0/client";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider loginUrl="/api/auth/login">
      <html lang="en">
        <body className={inter.className}>
          <ReduxProvider>{children}</ReduxProvider>
        </body>
      </html>
    </UserProvider>
  );
}
