import RefreshButton from "@/components/Buttons/RefreshButton";
import NotFoundTable from "@/components/Tables/NotFoundTable";
import TicketTable from "@/components/Tables/TicketTable";
import FilterSVG from "@/components/svg/FilterSVG";
import { TicketDTO } from "@/schemas/TicketSchema";
import { Button, IconButton } from "@/styles/ButtonStyles";
import { Flex, Main } from "@/styles/GlobalStyles";
import { getObjects } from "@/utils/objectQueries";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Page() {
  const tickets: TicketDTO[] = await getObjects(
    "http://localhost:3000/api/tickets"
  );

  return (
    <Main>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "62.5rem",
          width: "96%",
          margin: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <h1 style={{ fontSize: "1.5rem", color: "var(--text)" }}>Tickets</h1>
          <Flex $ml="0.25rem">
            <RefreshButton size="2.25rem" color="primary" />
            <IconButton
              $size="2.25rem"
              $p="0.25rem"
              $color="primary"
              title="Filtrar tickets"
            >
              <FilterSVG />
            </IconButton>
            <Button
              as={Link}
              href="/tickets/new"
              $color="primary"
              title="Añadir ticket"
            >
              Añadir ticket
            </Button>
          </Flex>
        </div>
        <div style={{ overflow: "hidden visible" }}>
          {tickets.length ? (
            <TicketTable tickets={tickets} />
          ) : (
            <NotFoundTable />
          )}
        </div>
      </div>
    </Main>
  );
}
