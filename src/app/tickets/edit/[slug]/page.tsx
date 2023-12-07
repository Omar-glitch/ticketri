import UpdateTicketForm from "@/components/Forms/UpdateTicketForm";
import getMetadata from "@/lib/metadata";
import { TUpdateTicket } from "@/schemas/TicketSchema";
import { Main } from "@/styles/GlobalStyles";
import { getObject } from "@/utils/objectQueries";
import { notFound } from "next/navigation";

export const metadata = getMetadata({
  title: "Editar ticket",
  description: "Editar tickets",
  addCompanyNameInTitle: true,
  url: "/tickets/edit",
});

export default async function Page({
  params: { slug },
}: {
  params: { slug: string };
}) {
  let ticket: TUpdateTicket | null = await getObject(
    `http://localhost:3000/api/tickets/${slug}`
  );
  if (!ticket) notFound();

  return (
    <Main>
      <UpdateTicketForm updateMode={{ initialTicket: ticket, id: slug }} />
    </Main>
  );
}
