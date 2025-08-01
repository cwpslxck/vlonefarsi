import MainLayout from "@/components/main-layout";

function NotFound() {
  return (
    <MainLayout>
      <div className="min-h-[80svh] w-full flex justify-center items-center flex-col">
        <p className="text-7xl font-bold">404</p>
        <p>این صفحه پیدا نشد!</p>
      </div>
    </MainLayout>
  );
}

export default NotFound;
