"use client";

import { TICKET_STATUS } from "@/schemas/TicketSchema";
import { useState } from "react";
import { USER_AREAS } from "@/schemas/UserSchema";

type getParamProps = {
  value: string;
  name: string;
};

export default function TicketsChart() {
  const [status, setStatus] = useState("todos");
  const [area, setArea] = useState("todos");

  const getParams = (params: getParamProps[]) => {
    const toFilterString = params.reduce((accumulator, current) => {
      const n =
        !current.value || current.value === "todos"
          ? ""
          : `'${current.name}':'${current.value}'`;
      return (accumulator.length ? `${accumulator},` : "") + n;
    }, "");
    if (toFilterString === "") return "";
    return `&filter={${toFilterString}}`;
  };

  console.log(
    getParams([
      { name: "area", value: area },
      { name: "status", value: status },
    ])
  );

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
        <p style={{ marginRight: "0.25rem" }}>Filtrar por area:</p>
        <select onChange={(e) => setArea(e.target.value)}>
          <option>todos</option>
          {USER_AREAS.map((s) => (
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
        src={`https://charts.mongodb.com/charts-project-0-dydwb/embed/charts?id=656f573d-469b-4bea-80d8-3629895d595a&theme=light&maxDataAge=300${getParams(
          [
            { name: "area", value: area },
            { name: "status", value: status },
          ]
        )}&autoRefresh=true`}
      ></iframe>
    </div>
  );
}
