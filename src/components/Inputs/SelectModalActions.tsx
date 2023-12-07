import { IconButton } from "@/styles/ButtonStyles";
import React from "react";
import ReloadSVG from "../svg/ReloadSVG";
import CloseSVG from "../svg/Close";

type SelectModalActionsProps = {
  title: string;
  refreshData: () => void;
  closeModal: () => void;
};

export default function SelectModalActions({
  title,
  refreshData,
  closeModal,
}: SelectModalActionsProps) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <h3>{title}</h3>
      <div style={{ display: "flex" }}>
        <IconButton
          title="Recargar"
          $p="0.0625rem"
          $size="1.375rem"
          $color="primary"
          onClick={refreshData}
        >
          <ReloadSVG />
        </IconButton>
        <IconButton
          title="Cerrar"
          $size="1.375rem"
          $color="primary"
          onClick={closeModal}
        >
          <CloseSVG />
        </IconButton>
      </div>
    </div>
  );
}
