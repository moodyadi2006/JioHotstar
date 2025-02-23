"use client";
import Link from "next/link";
import { LogOut } from "lucide-react";
import axios from "axios";
import { useCallback } from "react";
import { useRouter } from "next/navigation"; // Correct import for App Directory
import { useToast } from "@/hooks/use-toast";

const ClientComponent = ({ token }) => {
  const router = useRouter(); // Correctly using the App Router's useRouter
  const { toast } = useToast();

  const handleLogout = useCallback(async () => {
    try {
      await axios.post("/api/logout");
      toast({
        title: "Logout Successful",
        description: "You have logged out from JioHotstar",
        variant: "destructive",
      });
      router.refresh(); // Use router.refresh() instead of router.reload()
    } catch (error) {
      console.error("Logout failed:", error);
      toast({
        title: "Error while Log out",
        description: "An error occurred while logging out.",
        variant: "destructive",
      });
    }
  }, [router, toast]);

  return (
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0)), url('https://images.pexels.com/photos/3279307/pexels-photo-3279307.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
      }}
    >
      {token ? (
        <div className="relative flex flex-col justify-center items-center h-full text-center px-4">
          <div className="border-b-2 border-gray-500 pb-4">
            <div className="absolute top-10 left-16">
              <Link
                href="/subscription"
                className="text-white text-2xl"
                aria-label="Subscription"
              >
                Subscribe to enjoy JioHotstar{" "}
                <span className="font-extrabold">{">"}</span>
              </Link>
            </div>
            <div className="absolute top-20 left-16">
              <p className="text-lg text-white">
                {token?.email || "Email not found"}
              </p>
            </div>
          </div>
          <div className="absolute top-10 right-16 flex space-x-4">
            <Link
              href="/subscription"
              className="px-8 py-2 text-2xl bg-gradient-to-r from-blue-500 to-pink-600 text-white rounded-lg shadow-lg hover:opacity-90 transition-all duration-300"
              aria-label="Subscription"
            >
              Subscribe
            </Link>
            <button
              className="px-5 py-2 text-2xl flex items-center gap-2 bg-red-700 text-white rounded-lg shadow-lg hover:opacity-90 transition-all duration-300"
              onClick={handleLogout}
            >
              <p>Logout</p>
              <LogOut />
            </button>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Continue Watching for {token.username}
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-md mb-8">
            Start watching from where you left off, personalise for kids and
            more
          </p>
        </div>
      ) : (
        <div className="relative flex flex-col justify-center items-center h-full text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Login to JioHotstar
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-md mb-8">
            Start watching from where you left off, personalise for kids and
            more
          </p>
          <Link
            href="/signIn"
            className="rounded-full font-semibold text-lg px-12 py-4 bg-gradient-to-r from-blue-500 to-pink-600 text-white hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg"
            aria-label="Login"
          >
            Login
          </Link>
        </div>
      )}
    </div>
  );
};

export default ClientComponent;
