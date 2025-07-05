import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VLONEFARSI - قاب ها",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
