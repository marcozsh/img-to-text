import { getServerSession } from "next-auth/next";
//import type { NextRequest } from "next/server";
import { authOptions } from "../../lib/authOptions";
import CustomNavBar from "@/components/custom-nav-bar";

export default async function NavbarSession(): Promise<any> {
  const session = await getServerSession(authOptions);

  //console.log(session)

  return (
      <div>
        {session !== null ? (
          <>
            <header className="flex justify-center w-screen">
              <CustomNavBar name={session.user?.name} />
            </header>
          </>
        ) : (
           <>
            <header className="flex justify-center w-screen">
              <CustomNavBar name={null}/>
            </header>
          </>
        )}
          
    </div>
  );
}
