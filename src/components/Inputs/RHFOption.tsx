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
  data: string[];
};

type RHFOptionProps = {
  config: Config;
  register: UseFormRegisterReturn<any>;
  error: string | undefined;
  control: Control<any>;
};

export default function RHFOption({
  config,
  error,
  control,
  register,
}: RHFOptionProps) {
  const value = useWatch({ control, name: config.name });

  return (
    <InputLabel htmlFor={config.name} $error={Boolean(error)} $isDate={true}>
      <Placeholder $active={value} $error={Boolean(error)}>
        {config.placeholder}
      </Placeholder>
      <InputStyle
        as="select"
        id={config.name}
        {...register}
        style={{ marginTop: "-0.1875rem" }}
      >
        {config.data.map((d) => (
          <option
            style={{
              height: "1.1494rem",
              color: "var(--text)",
              background: "var(--paper)",
            }}
            key={d}
          >
            {d}
          </option>
        ))}
      </InputStyle>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputLabel>
  );
}
