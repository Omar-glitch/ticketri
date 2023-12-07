import {
  ErrorMessage,
  IconLabel,
  InputLabel,
  InputStyle,
  Placeholder,
} from "@/styles/InputStyles";
import { UseFormRegisterReturn, Control, useWatch } from "react-hook-form";

type Config = {
  name: string;
  placeholder: string;
  type?:
    | "text"
    | "date"
    | "number"
    | "password"
    | "textarea"
    | "month"
    | "email";
  icon: React.ReactNode;
};

type RHFInputProps = {
  config: Config;
  register: UseFormRegisterReturn<any>;
  error: string | undefined;
  control: Control<any>;
};

export default function RHFInput({
  config,
  error,
  control,
  register,
}: RHFInputProps) {
  const value = useWatch({ control, name: config.name });
  const isDateInput = config.type === "date" || config.type === "month";

  return (
    <InputLabel
      htmlFor={config.name}
      $error={Boolean(error)}
      $isDate={isDateInput}
    >
      <IconLabel>{config.icon}</IconLabel>
      <Placeholder $active={isDateInput || value} $error={Boolean(error)}>
        {config.placeholder}
      </Placeholder>
      <InputStyle
        id={config.name}
        {...register}
        type={config.type ?? "text"}
        as={config.type === "textarea" ? "textarea" : "input"}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputLabel>
  );
}
