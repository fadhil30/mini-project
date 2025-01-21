"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="fixed z-10 w-full bg-[#232536] px-4 py-4 md:px-12 font-montserrat text-lg font-medium">
      <div className="flex h-12 items-center justify-between">
        {/* Logo */}
        <div className="relative w-[200px] h-[40px]">
          <Link href="/">
            <Image
              src="/eventify-logo.svg"
              alt="Company Logo"
              fill
              className="object-cover"
            />
          </Link>
        </div>

        {/* Menu Toggle for Mobile */}
        <button className="text-2xl text-white md:hidden" onClick={toggleMenu}>
          {isOpen ? "✖" : "☰"}
        </button>

        {/* Navigation Links */}
        <ul
          className={`${
            isOpen ? "block" : "hidden"
          } absolute left-0 top-16 w-full bg-[#232536] px-6 py-6 transition-all md:relative md:top-0 md:flex md:w-auto md:items-center md:gap-6 md:px-0 md:py-0`}
        >
          <li className="border-b border-gray-300 pb-4 md:border-none md:pb-0">
            <Link
              href="/"
              onClick={handleLinkClick}
              className="relative text-white transition duration-200 ease-in-out hover:border-b-2 hover:border-[#FFE047]"
            >
              Home
            </Link>
          </li>
          <li className="border-b border-gray-300 pb-4 md:border-none md:pb-0">
            <Link
              href="/blog"
              onClick={handleLinkClick}
              className="relative text-white transition duration-200 ease-in-out hover:border-b-2 hover:border-[#FFE047]"
            >
              Events
            </Link>
          </li>
          <li className="border-b border-gray-300 pb-4 md:border-none md:pb-0">
            <Link
              href="/about"
              onClick={handleLinkClick}
              className="relative text-white transition duration-200 ease-in-out hover:border-b-2 hover:border-[#FFE047]"
            >
              About
            </Link>
          </li>
          <li className="border-b border-gray-300 pb-4 md:border-none md:pb-0">
            <Link
              href="/contact"
              onClick={handleLinkClick}
              className="relative text-white transition duration-200 ease-in-out hover:border-b-2 hover:border-[#FFE047]"
            >
              Contact
            </Link>
          </li>
        </ul>

        {/* Additional Links and Buttons */}
        <ul className="flex flex-row justify-between gap-7 items-center">
          <li className="border-b border-gray-300 pb-4 md:border-none md:pb-0">
            <Link
              href="/createEvent"
              onClick={handleLinkClick}
              className="relative text-white transition duration-200 ease-in-out hover:border-b-2 hover:border-[#FFE047]"
            >
              Create Event
            </Link>
          </li>
          <li className="border-b border-gray-300 pb-4 md:border-none md:pb-0">
            <Link
              href="/login"
              onClick={handleLinkClick}
              className="relative text-white transition duration-200 ease-in-out hover:border-b-2 hover:border-[#FFE047]"
            >
              Login
            </Link>
          </li>
          <button className="bg-[#FFE047] px-5 py-1 rounded-lg hover:scale-105 transition duration-200">
            Sign Up
          </button>
        </ul>
      </div>
    </nav>
  );
}
