import {
  ErrorMessage,
  IconLabel,
  InputLabel,
  InputStyle,
  Placeholder,
} from "@/styles/InputStyles";
import { ChangeEvent } from "react";

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

type InputProps = {
  config: Config;
  value: string | number | boolean;
  error: string | undefined;
  setValue: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({ config, error, value, setValue }: InputProps) {
  const isDateInput = config.type === "date" || config.type === "month";

  return (
    <InputLabel
      htmlFor={config.name}
      $error={Boolean(error)}
      $isDate={isDateInput}
    >
      <IconLabel>{config.icon}</IconLabel>
      <Placeholder
        $active={isDateInput || Boolean(value)}
        $error={Boolean(error)}
      >
        {config.placeholder}
      </Placeholder>
      <InputStyle
        id={config.name}
        onChange={setValue}
        type={config.type ?? "text"}
        as={config.type === "textarea" ? "textarea" : "input"}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputLabel>
  );
}
