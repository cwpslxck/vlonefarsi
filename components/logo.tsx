import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type Props = {
  className?: string;
  invert?: boolean;
};

function Logo(props: Props) {
  return (
    <Link href={"/"} draggable="false">
      <div className="size-16">
        <Image
          alt="Logo"
          src={"/images/logo.png"}
          width={100}
          height={100}
          className={cn(
            props.className,
            "h-full w-full object-contain",
            props.invert ? "invert" : "invert-0"
          )}
          draggable="false"
          priority
        />
      </div>
    </Link>
  );
}

export default Logo;
