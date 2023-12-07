"use client";

import { TICKET_STATUS } from "@/schemas/TicketSchema";
import { useState } from "react";

export default function TicketsChart() {
  const [status, setStatus] = useState("todos");

  const getStatusParam = (status: string) => {
    if (!status || status === "todos") return "";
    return `&filter={'status':'${status}'}`;
  };

  return (
    <div style={{ margin: "auto" }}>
      <div
        style={{ display: "flex", alignItems: "center", color: "var(--text)" }}
      >
        <p style={{ marginRight: "0.25rem" }}>Filtrar por estado:</p>
        <select onChange={(e) => setStatus(e.target.value)}>
          <option>todos</option>
          {TICKET_STATUS.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      <iframe
        style={{
          background: "var(--paper)",
          border: "none",
          borderRadius: "2px",
          transition: "var(--transition) background",
        }}
        width="640"
        height="480"
        src={`https://charts.mongodb.com/charts-project-0-dydwb/embed/charts?id=656f573d-469b-4bea-80d8-3629895d595a&theme=light&maxDataAge=3600${getStatusParam(
          status
        )}&autoRefresh=true`}
      ></iframe>
    </div>
  );
}
