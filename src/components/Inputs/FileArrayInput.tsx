import { IconButton } from "@/styles/ButtonStyles";
import { useFieldArray } from "react-hook-form";
import MinusSVG from "../svg/MinusSVG";
import PlusSVG from "../svg/PlusSVG";
import { UseFormRegisterReturn, Control, useWatch } from "react-hook-form";

type FileArrayInputProps = {
  register: UseFormRegisterReturn<any>;
  error: string | undefined;
  control: Control<any>;
};

export default function FileArrayInput({
  register,
  control,
  error,
}: FileArrayInputProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "files",
  });

  return (
    <></>
    // <InputLabel></InputLabel>
  );
}
