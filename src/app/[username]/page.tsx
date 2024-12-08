import { notFound } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../lib/authOptions";
import UserTabs from "@/components/user-interface-tabs";

export default async function UsuarioPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const username = (await params).username;

  const usernameDecoded = decodeURIComponent(username);

  const session = await getServerSession(authOptions);

  if (usernameDecoded !== session?.user?.name) {
    notFound();
  }

  return (
    <>
      <UserTabs
        name={session.user.name}
        email={session.user.email || ""}
        image={session.user.image || ""}
      />
    </>
  );
}
