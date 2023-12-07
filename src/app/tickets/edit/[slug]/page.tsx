import TicketForm from "@/components/Forms/TicketForm";
import { TCreateTicket } from "@/schemas/TicketSchema";
import { Main } from "@/styles/GlobalStyles";
import { getObject } from "@/utils/objectQueries";
import { notFound } from "next/navigation";

export default async function Page({
  params: { slug },
}: {
  params: { slug: string };
}) {
  let ticket: TCreateTicket | null = await getObject(
    `http://localhost:3000/api/tickets/${slug}`
  );
  if (!ticket) notFound();

  return (
    <Main>
      <TicketForm updateMode={{ initialTicket: ticket, id: slug }} />
    </Main>
  );
}
