"use client";

import { TCreateTicket, ticketValidationSchema } from "@/schemas/TicketSchema";
import { TICKET_CATEGORIES } from "@/schemas/TicketSchema";
import { FormStyles } from "@/styles/InputStyles";
import getErrorMessage from "@/utils/errorResponses";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { SubmitHandler, useForm, useFieldArray } from "react-hook-form";
import toast from "react-hot-toast";
import RHFOption from "../Inputs/RHFOption";
import RHFInput from "../Inputs/RHFInput";
import DescriptionSVG from "../svg/DescriptionSVG";
import { Button, IconButton } from "@/styles/ButtonStyles";
import { IconWrapper } from "@/styles/GlobalStyles";
import LoaderSVG from "../svg/LoaderSVG";
import MinusSVG from "../svg/MinusSVG";
import PlusSVG from "../svg/PlusSVG";

const DEFAULT_CREATE_TICKET: TCreateTicket = {
  category: "hardware",
  description: "",
  files: [],
};

export default function TicketForm() {
  const {
    formState: { errors, isSubmitting },
    control,
    register,
    handleSubmit,
    reset,
  } = useForm<TCreateTicket>({
    defaultValues: DEFAULT_CREATE_TICKET,
    resolver: zodResolver(ticketValidationSchema),
  });

  const { fields, append, remove } = useFieldArray({ control, name: "files" });

  const onSubmit: SubmitHandler<TCreateTicket> = async (data) => {
    try {
      const formdata = new FormData();
      (Object.keys(data) as Array<keyof typeof data>).map((key) => {
        if (key === "files") {
          data.files.map((file: { value: FileList }) => {
            formdata.append(key, file.value[0]);
          });
        } else {
          formdata.append(key, data[key]);
        }
      });
      await axios({
        method: "POST",
        url: "/api/tickets",
        data: formdata,
      });
      reset();
      toast.success("Ticket agregado");
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error(JSON.stringify(errorMessage));
    }
  };

  return (
    <FormStyles onSubmit={handleSubmit(onSubmit)}>
      <p style={{ fontSize: "2rem", color: "var(--text)", fontWeight: 600 }}>
        Crear ticket
      </p>
      <RHFOption
        config={{
          data: TICKET_CATEGORIES,
          name: "category",
          placeholder: "Categoría",
        }}
        register={register("category")}
        control={control}
        error={errors.category?.message}
      />

      <RHFInput
        config={{
          name: "description",
          type: "textarea",
          icon: <DescriptionSVG />,
          placeholder: "Descripción",
        }}
        control={control}
        error={errors.description?.message}
        register={register("description")}
      />

      <div
        style={{
          color: "var(--primary)",
          padding: "0.75rem",
          background: "rgba(var(--primary-channel), .05)",
          borderRadius: "1rem",
        }}
      >
        Archivos
        {fields.map((field, index) => (
          <div
            key={field.id}
            style={{
              display: "flex",
              margin: "0.5rem 0",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <input
              type="file"
              {...register(`files.${index}.value`)}
              accept="image/*,.pdf,.docx"
            />
            <IconButton
              title="Eliminar elemento"
              type="button"
              onClick={() => remove(index)}
              $size="1.375rem"
              $color="primary"
            >
              <MinusSVG />
            </IconButton>
          </div>
        ))}
        <IconButton
          title="añadir elemento"
          type="button"
          $m="auto"
          $size="1.375rem"
          $color="primary"
          onClick={() => append({ value: "" })}
        >
          <PlusSVG />
        </IconButton>
      </div>
      <p style={{ color: "var(--error)", fontSize: "0.75rem", margin: "auto" }}>
        {" "}
        {errors.files?.message} {errors.files?.root?.message}{" "}
      </p>

      <Button $color="primary" disabled={isSubmitting} $mb="1rem">
        {isSubmitting ? (
          <>
            Enviando...
            <IconWrapper $size="1rem" $ml="0.25rem">
              <LoaderSVG sizeInRem={1} color="var(--paper)" />
            </IconWrapper>
          </>
        ) : (
          "Enviar"
        )}
      </Button>
    </FormStyles>
  );
}
