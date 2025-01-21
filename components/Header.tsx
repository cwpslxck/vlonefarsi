import { FaUserAlt } from "react-icons/fa";

export default function Header() {
  return (
    <header className="py-4 flex justify-between items-center mb-4">
      <a href="/" className="text-2xl font-black">
        ویلون فارسی
      </a>
      <a
        className="bg-black text-white px-3 py-2 rounded-lg inline-flex gap-1 justify-center items-center"
        href="/dashboard"
      >
        <FaUserAlt />
        حساب کاربری
      </a>
    </header>
  );
}
