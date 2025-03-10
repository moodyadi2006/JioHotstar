import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./(app)/Components/Footer";
import Header from "./(app)/Components/Header";
import AuthProvider from "@/context/AuthProvider";
import { Toaster } from "@/components/ui/toaster";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "JioHotstar",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <div className="flex flex-col justify-between items-center w-full">
            <div className="flex justify-between">
              <Header />
            </div>
            <div className="ml-24 w-[93.7%]">{children}</div>
            <div className="ml-24 w-[93.7%]">
              <Footer />
            </div>
          </div>
          <Toaster />
        </body>
      </AuthProvider>
    </html>
  );
}
