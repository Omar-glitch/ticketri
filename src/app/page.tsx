import InventorySVG from "@/components/svg/InventorySVG";
import RoleSVG from "@/components/svg/RoleSVG";
import TicketSVG from "@/components/svg/TicketSVG";
import { IconWrapper, Main } from "@/styles/GlobalStyles";
import { ModuleWrapper } from "@/styles/Wrappers";

export default function Home() {
  return (
    <Main>
      <div
        style={{
          maxWidth: "62.5rem",
          width: "96%",
          display: "flex",
          margin: "auto",
          flexDirection: "column",
          color: "var(--text)",
        }}
      >
        <h1>Tus módulos</h1>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            gap: "0.75rem",
          }}
        >
          <ModuleWrapper title="Usuarios" href="/users">
            <IconWrapper $size="2.75rem">
              <RoleSVG />
            </IconWrapper>
            <p>Usuarios</p>
          </ModuleWrapper>
          <ModuleWrapper title="Tickets" href="/tickets">
            <IconWrapper $size="2.75rem">
              <TicketSVG />
            </IconWrapper>
            <p>Tickets</p>
          </ModuleWrapper>
          <ModuleWrapper title="Gráficos" href="/charts">
            <IconWrapper $size="2.75rem">
              <InventorySVG />
            </IconWrapper>
            <p>Gráficos</p>
          </ModuleWrapper>
        </div>
      </div>
    </Main>
  );
}
