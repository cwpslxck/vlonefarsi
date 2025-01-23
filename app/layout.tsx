import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Rubik } from "next/font/google";
import "./globals.css";

const font = Rubik({
  subsets: ["arabic"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${font.className} container h-full px-4 mx-auto`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
