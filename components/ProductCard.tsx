import Image from "next/image";
import Link from "next/link";

export default function ProductCard({
  id,
  title,
  image,
}: {
  id?: string;
  title: string;
  image: string;
}) {
  return (
    <Link
      href={`/phonecase/${id}`}
      className="aspect-[1/2] w-full min-w-full object-cover relative hover:scale-105 transition-transform"
    >
      {/* Product Image */}
      <Image
        alt={`Preview of ${title} Phonecase`}
        width={200}
        height={200}
        quality={50}
        src={image}
        draggable="false"
        loading="lazy"
        className="rounded-3xl aspect-[1/2] w-full h-full object-cover bg-zinc-800"
      />
      <div className="absolute w-1/2 top-[2%] left-[5%] flex justify-end">
        <div className="w-4/6 p-[6%] bg-stone-400/10 backdrop-blur-2xl rounded-full flex flex-col gap-1">
          <div className="bg-black/70 border-2 border-stone-200/10 aspect-square w-full rounded-full"></div>
          <div className="bg-black/70 border-2 border-stone-200/10 aspect-square w-full rounded-full"></div>
        </div>
      </div>
    </Link>
  );
}
