import Image from "next/image";
import React from "react";

function Logo() {
  return (
    <Image
      alt="Logo"
      src={"/images/logo.png"}
      width={100}
      height={100}
      className="size-16"
      draggable
      priority
    />
  );
}

export default Logo;
