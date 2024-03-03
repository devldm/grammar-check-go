import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";
import Footer from "../components/Footer";
import AuthdNavbar from "../components/nav/Navbar";
import SignedOutNavbar from "../components/nav/SignedOutNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GrammarCheck",
  description: "Practice Korean grammar and learn with others.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" data-theme="forest">
        <body className={inter.className}>
          <SignedIn>
            <AuthdNavbar />
          </SignedIn>
          <SignedOut>
            <SignedOutNavbar />
          </SignedOut>
          <main className="pt-14">
            {children}
          </main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
