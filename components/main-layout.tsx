import Header from "@/components/header";
import Footer from "@/components/footer";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex justify-between flex-col items-center">
      <div className="w-full min-h-dvh">
        <Header />
        <main className="mx-auto container max-w-4xl p-4">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
