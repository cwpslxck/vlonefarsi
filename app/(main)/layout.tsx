import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";

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
    <>
      <Header />
      <main className="mx-auto container max-w-3xl p-4">{children}</main>
      <Footer />
    </>
  );
}
