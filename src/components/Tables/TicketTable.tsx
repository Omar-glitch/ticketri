import { Table, Td } from "@/styles/TableStyles";
import ButtonActionsTable, { ButtonTh } from "../Buttons/ButtonActionsTable";
import { TicketDTO } from "@/schemas/TicketSchema";
import { objectIdToDateFormat } from "@/utils/texts";
import { TextEllipsis } from "@/styles/GlobalStyles";

export default function TicketTable({ tickets }: { tickets: TicketDTO[] }) {
  return (
    <div
      style={{
        overflow: "hidden visible",
        marginTop: "0.625rem",
      }}
    >
      <Table>
        <thead>
          <tr>
            <th>Fecha creado</th>
            <th>Id</th>
            <th>Categoría</th>
            <th>Descripción</th>
            <th>Área</th>
            <th>Estado</th>
            <th>Prioridad</th>
            <th>Usuario ticket</th>
            <th>Usuario asignado</th>
            <th>Fecha cierre</th>
            <ButtonTh />
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => {
            return (
              <tr key={ticket.id}>
                <Td>{objectIdToDateFormat(ticket.id)}</Td>
                <Td>{ticket.id}</Td>
                <Td $minw="5rem">{ticket.category}</Td>
                <Td $w="100%" $minw="7.5rem">
                  <TextEllipsis $h="4.75rem" $lc={4}>
                    {ticket.description}
                  </TextEllipsis>
                </Td>
                <Td>{ticket.area}</Td>
                <Td>{ticket.status}</Td>
                <Td>{ticket.priority}</Td>
                <Td>{ticket.user}</Td>
                <Td>{ticket.user_asigned}</Td>
                <Td>{ticket.close_date}</Td>
                <ButtonActionsTable
                  editUrl={`/tickets/edit/${ticket.id}`}
                  deleteUrl={`/api/tickets/${ticket.id}`}
                />
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
