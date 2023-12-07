import UsersForm from "@/components/Forms/UsersForm";
import getMetadata from "@/lib/metadata";
import { TCreateUser } from "@/schemas/UserSchema";
import { Main } from "@/styles/GlobalStyles";
import { getObject } from "@/utils/objectQueries";
import { notFound } from "next/navigation";

export const metadata = getMetadata({
  title: "Editar usuario",
  description: "Editar usuarios",
  addCompanyNameInTitle: true,
  url: "/users/edit",
});

export default async function Page({
  params: { slug },
}: {
  params: { slug: string };
}) {
  let user: TCreateUser | null = await getObject(
    `http://localhost:3000/api/users/${slug}`
  );
  if (!user) notFound();

  return (
    <Main>
      <UsersForm updateMode={{ initialUser: user, id: slug }} />
    </Main>
  );
}
