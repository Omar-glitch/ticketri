import Link from "next/link";
import TicketSVG from "../svg/TicketSVG";

type LogoProps = {
  size: string;
  color?: string;
  zIndex?: number;
};

export default function Logo({
  size,
  color = "var(--primary)",
  zIndex = 0,
}: LogoProps) {
  return (
    <Link href="/" style={{ zIndex }} title="Inicio">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          color: color,
        }}
      >
        <div style={{ width: size, height: size, marginRight: "0.375rem" }}>
          <TicketSVG />
        </div>
        <p style={{ fontSize: `calc(${size} - 0.8rem)` }}>TicketRI</p>
      </div>
    </Link>
  );
}
