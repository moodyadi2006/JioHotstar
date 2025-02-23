"use client";
import Link from "next/link";
import {
  Home,
  Search,
  Monitor,
  Popcorn,
  List,
  Video,
  User,
} from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [clicked, setClicked] = useState(false);
  return (
    <header className="fixed left-0 top-0 h-full w-[7%] bg-[#111] text-gray-400 flex flex-col items-center py-6 z-50">
      <Link
        href="/subscription"
        className="mt-8 mb-10 text-white hover:text-white transition-colors"
        aria-label="Subscription"
      >
        <img src="/assets/logo.png" alt="Logo" className="h-15 w-15" />
      </Link>

      <nav className="flex flex-col items-center space-y-6">
        {[
          {
            href: "/",
            icon: <Home className="w-6 h-6 text-white" />,
            label: "Home",
          },
          {
            href: "/search",
            icon: <Search className="w-6 h-6 text-white" />,
            label: "Search",
          },
          {
            href: "/tv",
            icon: <Monitor className="w-6 h-6 text-white" />,
            label: "Tv",
          },
          {
            href: "/movie",
            icon: <Popcorn className="w-6 h-6 text-white" />,
            label: "Movie",
          },
          {
            href: "/anime",
            icon: <Video className="w-6 h-6 text-white" />,
            label: "Anime",
          },
          {
            href: "/categories",
            icon: <List className="w-6 h-6 text-white" />,
            label: "Categories",
          },
          {
            href: "/profile",
            icon: <User className="w-6 h-6 text-white" />,
            label: "Profile",
          },
        ].map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="relative group"
            aria-label={item.label}
          >
            <div className="flex items-center justify-center relative mb-3">
              <div className="w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 group-hover:bg-gradient-to-r from-[#3550d4] to-[#e52e71] shadow-lg group-hover:scale-110">
                {item.icon}
              </div>
              <p className="absolute top-full mt-1 px-3 py-1 bg-[#222] text-white rounded-lg text-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:translate-y-1 shadow-md">
                {item.label}
              </p>
            </div>
          </Link>
        ))}
      </nav>
    </header>
  );
}
