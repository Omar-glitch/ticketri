import { auth } from "@/auth";
import { Main } from "@/styles/GlobalStyles";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  if (!session) redirect("/api/auth/signin");

  return (
    <Main>
      <div
        style={{
          maxWidth: "62.5rem",
          margin: "auto",
          width: "96%",
          color: "var(--text)",
        }}
      >
        <h1>Mi cuenta</h1>
        <p style={{ margin: "0.75rem 0" }}>Nombre: {session.user.name}</p>
        <p style={{ margin: "0.75rem 0" }}>Email: {session.user.email}</p>
        <p style={{ margin: "0.75rem 0" }}>Role: {session.user.role}</p>
      </div>
    </Main>
  );
}
