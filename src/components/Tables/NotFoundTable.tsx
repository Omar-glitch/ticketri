import { IconWrapper } from "@/styles/GlobalStyles";
import NotFoundSVG from "../svg/NotFoundSVG";

export default function NotFoundTable() {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        flexDirection: "column",
        color: "var(--text)",
      }}
    >
      <IconWrapper $size="16.875rem">
        <NotFoundSVG />
      </IconWrapper>
      <p style={{ marginTop: "1rem", fontSize: "1.125rem" }}>
        No se encontró nada
      </p>
    </div>
  );
}
