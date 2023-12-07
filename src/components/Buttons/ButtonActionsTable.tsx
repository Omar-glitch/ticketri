"use client";

import { IconButton } from "@/styles/ButtonStyles";
import React from "react";
import EditSVG from "../svg/EditSVG";
import TrashSVG from "../svg/TrashSVG";
import { Td } from "@/styles/TableStyles";
import toast from "react-hot-toast";
import axios from "axios";
import Link from "next/link";
import getErrorMessage from "@/utils/errorResponses";
import { useSession } from "next-auth/react";

export function ButtonTh() {
  const session = useSession();
  if (session.data?.user.role !== "admin") return null;
  return (
    <>
      <th>Editar</th>
      <th>Eliminar</th>
    </>
  );
}

export default function ButtonActionsTable({
  editUrl,
  deleteUrl,
}: {
  editUrl: string;
  deleteUrl: string;
}) {
  const session = useSession();

  if (session.data?.user.role !== "admin") {
    return <></>;
  }

  const deleteUser = async () => {
    const confirmed = confirm("¿Estas seguro de eliminar?");
    if (!confirmed) return;

    const loadToast = toast.loading("Eliminando...");
    try {
      await axios.delete(`${deleteUrl}`);
      toast.success("Eliminado");
    } catch (e) {
      const errorMessage = getErrorMessage(e);
      toast.error(errorMessage);
    }
    toast.dismiss(loadToast);
  };

  return (
    <>
      <Td $maxw="5rem">
        <IconButton
          as={Link}
          href={editUrl}
          title="Editar"
          $color="primary"
          $size="1.5rem"
          $p="0.1875rem"
          $m="auto"
        >
          <EditSVG />
        </IconButton>
      </Td>
      <Td $maxw="5rem">
        <IconButton
          onClick={deleteUser}
          title="Eliminar"
          $color="error"
          $size="1.5rem"
          $p="0.1875rem"
          $m="auto"
        >
          <TrashSVG />
        </IconButton>
      </Td>
    </>
  );
}
