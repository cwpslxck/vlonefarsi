import Image from "next/image";
import Link from "next/link";

export default function ProductCard({
  size,
  title,
  image,
}: {
  size?: number;
  title: string;
  image: string;
}) {
  return (
    <Link
      href={""}
      className="aspect-[9/18] min-w-full relative hover:scale-105 transition-transform"
    >
      {/* Product Image */}
      <Image
        alt={`Preview of ${title} Phonecase`}
        width={100}
        height={200}
        src={image}
        draggable="false"
        loading="lazy"
        className="rounded-3xl w-full h-full object-cover bg-purple-300"
      />

      <div className="absolute rounded-3xl inset-0 bg-black/10 pointer-events-none" />
      <span className="size-14 hidden">
        <span className="size-9 hidden"></span>
      </span>
      <div className="absolute top-1.5 left-1.5 p-1.5 bg-black/60 backdrop-blur-xl rounded-full flex flex-col gap-1">
        <div className={`bg-black size-${size || 9} rounded-full`}></div>
        <div className={`bg-black size-${size || 9} rounded-full`}></div>
      </div>
    </Link>
  );
}
