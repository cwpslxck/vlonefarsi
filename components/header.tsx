"use client";
import Link from "next/link";
import { BsInstagram } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const items = [
    {
      title: "قاب‌ها",
      href: "/phonecase",
    },
    {
      title: "طرح دلخواه",
      href: "/phonecase/custom",
    },
  ];

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* <div className="pointer-events-none p-2 break-all text-xs sm:text-lg select-none w-full bg-foreground h-12 text-background font-bold flex justify-center items-center gap-1">
        کد تخفیف 30% به مناسبت افتتاح وبسایت
        <span className="bg-red-600 font-medium text-xs sm:text-[1rem] text-white px-2 py-1 rounded">
          I-LOVE-VF
        </span>
      </div> */}
      <div
        className={cn(
          `flex z-50 overflow-hidden flex-col sticky top-0 w-full`,
          isMenuOpen ? "bg-transparent" : "bg-background/70 backdrop-blur-xl"
        )}
      >
        <div className="flex mx-auto container items-center h-14 w-full justify-between px-4">
          <div className="inline-flex gap-2 md:gap-6 items-center">
            {/* Hamburger Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden flex flex-col gap-1 p-2 hoveranim cursor-pointer"
              aria-label="Menu"
            >
              <span
                className={`w-5 h-0.5 bg-foreground transition-all duration-300 ${
                  isMenuOpen ? "rotate-45 translate-y-1.5" : ""
                }`}
              ></span>
              <span
                className={`w-5 h-0.5 bg-foreground transition-all duration-300 ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              ></span>
              <span
                className={`w-5 h-0.5 bg-foreground transition-all duration-300 ${
                  isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                }`}
              ></span>
            </button>

            <Link
              href={"/"}
              className="text-xl font-black tracking-widest hoveranim"
            >
              ویلون فارسی
            </Link>
            <ul className="hidden md:inline-flex gap-4">
              {items.map((item) => (
                <li
                  className="inline-flex gap-0.5 items-center"
                  key={item.href}
                >
                  <Link className="flex hoveranim" href={item.href}>
                    {item.title}
                  </Link>
                </li>
              ))}
              <div className="px-2.5 bg-foreground text-background hover:bg-foreground/95 transition-all hover:scale-102 py-1.5 font-medium text-sm rounded-full border">
                انتخاب مدل گوشی
              </div>
            </ul>
          </div>
          <div className="inline-flex items-center text-xl gap-3">
            <Link
              target="_blank"
              href={"https://instagram.com/vlonefarsi"}
              className="p-1 cursor-pointer hoveranim"
            >
              <BsInstagram />
            </Link>
            <Link
              href={"/profile"}
              className="size-8 flex rounded-md items-center justify-center cursor-pointer hoveranim bg-foreground text-background"
            >
              <FaUserAlt />
            </Link>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-background/70 backdrop-blur-xl"
            onClick={closeMenu}
          ></div>

          <div
            className={`absolute top-0 left-0 w-full transition-transform duration-200 ${
              isMenuOpen ? "translate-y-0" : "-translate-y-full"
            }`}
          >
            <div className="flex flex-col px-6 pt-20 gap-2">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2 text-white text-lg font-medium py-2 hoveranim"
                  onClick={closeMenu}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
