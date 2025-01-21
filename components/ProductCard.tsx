import Image from "next/image";
import Link from "next/link";

export default function ProductCard({
  title,
  image,
}: {
  title: string;
  image: string;
}) {
  return (
    <Link
      href={`/phonecase/1`}
      className="aspect-[1/2] w-full min-w-full relative hover:scale-105 transition-transform"
    >
      {/* Product Image */}
      <Image
        alt={`Preview of ${title} Phonecase`}
        width={200}
        height={400}
        quality={50}
        src={image}
        draggable="false"
        loading="lazy"
        className="rounded-3xl w-full h-full object-cover bg-purple-300"
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
