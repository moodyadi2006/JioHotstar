import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";
import { RxCross1 } from "react-icons/rx";
import ClientComponent from "./ClientComponent";
import { getToken } from "next-auth/jwt";

const Page = async () => {
  const cookieStore = await cookies();
  const token = await getToken({
    req: {
      cookies: cookieStore,
    },
    secret: process.env.NEXTAUTH_SECRET,
  });
  return (
    <div className="h-auto w-full bg-black">
      {/* Header */}
      <header className="flex sticky top-0 w-full justify-between items-center pt-4 px-20 mb-3 bg-black z-10">
        <div className="flex gap-3 items-center">
          <Link href="/">
            <RxCross1 className="text-white text-2xl cursor-pointer" />
          </Link>
          <img src="/assets/logo.png" alt="Logo" className="h-15 w-15" />
        </div>
        <div className="flex items-center text-white text-lg font-extrabold gap-3">
          <button className="bg-gray-900 px-5 py-2 rounded-xl hover:bg-gray-800 transition duration-200">
            English
          </button>
          {!token && (
            <Link href="/profile" className="bg-gradient-to-r from-blue-600 to-pink-600 px-4 py-2 mr-14 rounded-xl hover:opacity-90 transition duration-200">
              Login
            </Link>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="h-auto w-full flex justify-between px-20 pt-8 pb-10">
        {/* Left Section */}
        <div
          className="w-1/3 relative bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0)), url('https://wallpapers.com/images/hd/horror-movie-collage-2560-x-1600-7rsxip7198v2wynq.jpg')`,
          }}
        >
          <p className="text-white text-3xl font-bold leading-snug p-4">
            Subscribe and enjoy unlimited movies, shows & web series
          </p>
        </div>

        <ClientComponent token={token} />
      </div>
    </div>
  );
};

export default Page;
