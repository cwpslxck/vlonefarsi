import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/providers/theme-provider";
import ReactQueryProvider from "@/components/providers/query-client-provider";

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
    <html dir="rtl" lang="fa" suppressHydrationWarning>
      <body className={`${font.className} antialiased`}>
        <Header />
        <ThemeProvider
          attribute={"class"}
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <ReactQueryProvider>
            <main className="mx-auto container max-w-3xl p-4">{children}</main>
          </ReactQueryProvider>
        </ThemeProvider>
        <Footer />
      </body>
    </html>
  );
}
