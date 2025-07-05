import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

const font = Rubik({
  subsets: ["arabic"],
});

export const metadata: Metadata = {
  title: "VLONEFARSI",
  description: "CUSTOM PHONECASE ONLINESHOP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html dir="rtl" lang="fa">
      <body className={`${font.className} antialiased`}>
        <Header />
        <main className="mx-auto container pb-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
