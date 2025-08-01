import {
  CommandIcon,
  LocationEditIcon,
  Settings2Icon,
  ShoppingBagIcon,
} from "lucide-react";

export const MENU_ITEMS = [
  {
    title: "قاب‌ها",
    href: "/phonecase",
  },
  {
    title: "طرح دلخواه",
    href: "/phonecase/custom",
  },
];

export const DAHSBOARD_ITEMS = [
  {
    title: "داشبورد",
    href: "/dashboard",
    icon: CommandIcon,
  },
  {
    title: "سفارش‌ها",
    href: "/dashboard/orders",
    icon: ShoppingBagIcon,
  },
  {
    title: "آدرس‌ها",
    href: "/dashboard/addresses",
    icon: LocationEditIcon,
  },
  {
    title: "تنظیمات",
    href: "/dashboard/settings",
    icon: Settings2Icon,
  },
];
