import { cookies } from "next/headers";
import { getToken } from "next-auth/jwt";
import axios from "axios";
import ClientComponent from "./ClientComponent";

const Page = async () => {
  const cookieStore = await cookies();
  const token = await getToken({
    req: {
      cookies: cookieStore,
    },
    secret: process.env.NEXTAUTH_SECRET,
  });

  const handleLogout = async () => {
    const response = await axios.post("/api/logout");
    console.log(response);
    if (response.data.success) {
    }
  };
  return (
    <div className="relative h-screen w-full">
      <ClientComponent token={token}/>
    </div>
  );
};

export default Page;
