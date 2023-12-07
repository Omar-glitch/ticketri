import UsersForm from "@/components/Forms/UsersForm";
import getMetadata from "@/lib/metadata";
import { Main } from "@/styles/GlobalStyles";

export const metadata = getMetadata({
  title: "Crear usuario",
  description: "Crear usuarios",
  addCompanyNameInTitle: true,
  url: "/users/new",
});

export default function page() {
  return (
    <Main>
      <UsersForm />
    </Main>
  );
}
