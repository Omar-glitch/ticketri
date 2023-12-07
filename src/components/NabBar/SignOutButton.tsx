"use client";

import { Button, IconButton } from "@/styles/ButtonStyles";
import { hideOnMobileRatio } from "@/styles/GlobalStyles";
import { useSession, signOut } from "next-auth/react";

type SignOutButtonProps = {
  iconMode?: {
    icon: React.ReactNode;
    size: string;
  };
};

export default function SignOutButton({ iconMode }: SignOutButtonProps) {
  const { status } = useSession();

  if (status !== "authenticated") return null;

  if (iconMode) {
    return (
      <IconButton
        title="Cerrar sesión"
        $size={iconMode.size}
        $color="error"
        $p="0.375rem"
        onClick={() => signOut()}
      >
        {iconMode.icon}
      </IconButton>
    );
  }

  return (
    <Button
      title="Cerrar sesión"
      onClick={() => signOut()}
      $color="error"
      $mt="0.375rem"
    >
      Cerrar sesión
    </Button>
  );
}
