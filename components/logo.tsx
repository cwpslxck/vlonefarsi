import Image from "next/image";
import Link from "next/link";
function Logo() {
  return (
    <Link href={"/"} draggable="false">
      <Image
        alt="Logo"
        src={"/images/logo.png"}
        width={100}
        height={100}
        className="size-16"
        draggable="false"
        priority
      />
    </Link>
  );
}

export default Logo;
