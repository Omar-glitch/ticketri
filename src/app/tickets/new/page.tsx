import TicketForm from "@/components/Forms/TicketForm";
import getMetadata from "@/lib/metadata";
import { Main } from "@/styles/GlobalStyles";

export const metadata = getMetadata({
  title: "Crear ticket",
  description: "Crear tickets",
  addCompanyNameInTitle: true,
  url: "/tickets/new",
});

export default async function Page() {
  return (
    <Main>
      <TicketForm />
    </Main>
  );
}
