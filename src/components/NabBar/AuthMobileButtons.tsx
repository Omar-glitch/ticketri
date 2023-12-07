"use client";

import { Button } from "@/styles/ButtonStyles";
import Link from "next/link";
import SignOutButton from "./SignOutButton";
import { useSession } from "next-auth/react";

export default function AuthMobileButtons({
  closeModal,
}: {
  closeModal: () => void;
}) {
  const { status } = useSession();

  if (status !== "authenticated")
    return (
      <li>
        <Button
          as={Link}
          href="/api/auth/signin"
          $color="primary"
          onClick={closeModal}
        >
          Iniciar sesión
        </Button>
      </li>
    );

  return (
    <>
      <li>
        <Button
          as={Link}
          href={"/account"}
          $color="primary"
          onClick={closeModal}
        >
          Mi cuenta
        </Button>
      </li>
      <li>
        <SignOutButton />
      </li>
    </>
  );
}
