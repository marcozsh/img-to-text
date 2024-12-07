import { notFound } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../lib/authOptions";

export default async function UsuarioPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const username = (await params).username;

  const usernameDecoded = decodeURIComponent(username);

  const session = await getServerSession(authOptions);

  console.log(decodeURIComponent(username));
  console.log(session?.user);

  if (usernameDecoded !== session?.user?.name) {
    notFound();
  }

  return (
    <div>
      <h1>Bienvenido, {usernameDecoded}!</h1>
      <p>Esta es tu página principal.</p>
    </div>
  );
}
