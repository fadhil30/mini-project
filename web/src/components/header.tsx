"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search?q=${search}`);
  };

  return (
    <nav className="fixed z-10 w-full bg-[#232536] px-4 py-4 md:px-12">
      <div className="flex h-12 items-center justify-between">
        <div className="w-[120px]">
          <Link href="/">
            <Image
              src="/faithco-logo.svg"
              alt="Company Logo"
              width={120}
              height={50}
              priority
            />
          </Link>
        </div>
        <button className="text-2xl text-white md:hidden" onClick={toggleMenu}>
          {isOpen ? "✖" : "☰"}
        </button>
        <ul
          className={`${
            isOpen ? "block" : "hidden"
          } absolute left-0 top-16 w-full bg-[#232536] px-6 py-6 transition-all md:relative md:top-0 md:flex md:w-auto md:items-center md:gap-6 md:px-0 md:py-0`}
        >
          <li>
            <form onSubmit={handleSearch} className="flex">
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="rounded-md bg-white px-4 py-1 text-black"
              />
            </form>
          </li>
          <li className="border-b border-gray-300 pb-4 md:border-none md:pb-0">
            <Link
              href="/"
              onClick={handleLinkClick}
              className="font-openSans transform text-base font-medium text-white transition duration-200 ease-in-out hover:scale-110 hover:underline"
            >
              Home
            </Link>
          </li>
          <li className="border-b border-gray-300 pb-4 md:border-none md:pb-0">
            <Link
              href="/blog"
              onClick={handleLinkClick}
              className="transform text-base font-medium text-white transition duration-200 ease-in-out hover:scale-110 hover:underline"
            >
              Blogs
            </Link>
          </li>
          <li className="border-b border-gray-300 pb-4 md:border-none md:pb-0">
            <Link
              href="/about"
              onClick={handleLinkClick}
              className="transform text-base font-medium text-white transition duration-200 ease-in-out hover:scale-110 hover:underline"
            >
              About
            </Link>
          </li>
          <li className="border-b border-gray-300 pb-4 md:border-none md:pb-0">
            <Link
              href="/contact"
              onClick={handleLinkClick}
              className="transform text-base font-medium text-white transition duration-200 ease-in-out hover:scale-110 hover:underline"
            >
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
