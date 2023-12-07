import { Button } from "@/styles/ButtonStyles";
import { Bubble } from "@/styles/GlobalStyles";
import Link from "next/link";

export default function NotFound() {
  return (
    <main
      style={{
        position: "relative",
        color: "var(--text)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        maxWidth: "34.375rem",
      }}
    >
      <Bubble $a $t="10%" $l="4%" $size="10rem" />
      <Bubble $a $b="5%" $r="20%" $size="7.5rem" />
      <Bubble $a $t="40%" $r="5%" $size="5rem" />
      <h1 style={{ fontSize: "6rem" }}>404</h1>
      <div
        style={{
          width: "36%",
          minWidth: "13.75rem",
          background: "var(--text)",
          height: "0.25rem",
          borderRadius: "0.125rem",
        }}
      ></div>
      <p style={{ margin: "0.75rem" }}>Esta página no existe</p>
      <Button as={Link} href="/" $color="primary" $w="15rem" $outlined>
        Ir al inicio{" "}
      </Button>
    </main>
  );
}
