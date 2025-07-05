import Image from "next/image";
import Link from "next/link";

function Card() {
  return (
    <Link
      href={"/phonecase/blabla"}
      className="aspect-9/16 w-full border border-stone-900 bg-stone-900 rounded-4xl overflow-hidden relative"
    >
      <div className="absolute w-full h-full top-0 right-0 left-0">
        <Image
          src={"https://github.com/cwpslxck.png"}
          alt="Image"
          loading="lazy"
          height={300}
          width={200}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex absolute rounded-full bg-stone-800 border border-stone-900/40 flex-col w-1/3 m-[5%] p-[4%] left-0 top-0">
        <div className="bg-black border border-stone-900 rounded-full w-full aspect-square mb-[10%]"></div>
        <div className="bg-black border border-stone-900 rounded-full w-full aspect-square"></div>
      </div>
    </Link>
  );
}

export default Card;
