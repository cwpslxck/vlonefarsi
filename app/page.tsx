import Container from "@/features/phonecase/container";
export default function Home() {
  return (
    <div className="flex flex-col gap-4">
      <div className="">
        <div className="w-full aspect-2/1 bg-violet-400/30 rounded-md"></div>
      </div>
      <Container limit={6} />
    </div>
  );
}
