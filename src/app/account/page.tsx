import { auth } from "@/auth";
import { Main } from "@/styles/GlobalStyles";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  if (!session) redirect("/api/auth/signin");

  return (
    <Main>
      {session.user.email}
      {session.user.name}
      {session.user.role}
    </Main>
  );
}
