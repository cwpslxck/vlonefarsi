import Image from "next/image";
import Link from "next/link";
import { BsInstagram } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";

function Header() {
  const items = [
    {
      title: "راهنمای خرید",
      href: "/help",
      new: true,
    },
    {
      title: "قاب‌ها",
      href: "/phonecase",
      new: false,
    },
    {
      title: "طرح دلخواه",
      href: "/custom",
      new: false,
    },
  ];
  return (
    <>
      <div className="pointer-events-none select-none w-full bg-gradient-to-r from-stone-100 via-violet-100 to-stone-50 h-12 text-black font-bold flex justify-center items-center gap-1">
        کد تخفیف 30% به مناسبت افتتاح وبسایت
        <div className="bg-red-600 font-medium text-sm text-white px-2 py-1 rounded">I-LOVE-VF</div>
      </div>
      <div className="flex z-50 overflow-hidden flex-col sticky top-0 w-full bg-background/70 backdrop-blur-xl">
        <div className="flex mx-auto container items-center h-14 w-full justify-between px-4">
          <div className="inline-flex gap-6 items-center">
            {/* <div>
            <MenuIcon />
          </div> */}
            <Link
              href={"/"}
              className="text-xl font-black tracking-widest hoveranim"
            >
              ولون فارسی
            </Link>
            <ul className="hidden md:inline-flex gap-4">
              {items.map((item) => (
                <li
                  className="inline-flex gap-0.5 items-center"
                  key={item.href}
                >
                  <Link className="flex hoveranim" href={item.href}>
                    {item.title}
                    {item.new ? <p className="animate-bounce">‼️</p> : null}
                  </Link>
                </li>
              ))}
              {/* <Link className="hidden md:block" href={"/make-money"}>
              <div className="px-2.5 hover:bg-foreground hover:text-background transition-all hover:scale-110 py-1.5 font-medium text-sm rounded-full border">
                کسب درامد
              </div>
              </Link> */}
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
    </>
  );
}

export default Header;
