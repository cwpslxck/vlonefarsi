import { DisplayVersion } from "./display-version";
import Logo from "./logo";
import { MENU_ITEMS } from "@/constants/menu-item";
import Link from "next/link";

function Footer() {
  return (
    <div className="w-full px-4">
      <div className="container border rounded-t-3xl border-b-0 bg-card py-4 w-full mx-auto flex flex-col gap-6 justify-center items-center">
        <Logo />
        <ul className="flex flex-col md:flex-row items-center gap-4">
          {MENU_ITEMS.map((item) => (
            <li className="inline-flex gap-0.5 items-center" key={item.href}>
              <Link className="flex hoveranim" href={item.href}>
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
        <p dir="ltr" className="font-light text-sm">
          2025 VLONEFARSI © <DisplayVersion />
        </p>
      </div>
    </div>
  );
}

export default Footer;
