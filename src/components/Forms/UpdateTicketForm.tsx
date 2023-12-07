"use client";

import {
  TCreateTicket,
  TICKET_PRIORITIES,
  TICKET_STATUS,
  TUpdateTicket,
  ticketUpdateValidationSchema,
} from "@/schemas/TicketSchema";
import { TICKET_CATEGORIES } from "@/schemas/TicketSchema";
import { FormStyles } from "@/styles/InputStyles";
import getErrorMessage from "@/utils/errorResponses";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { SubmitHandler, useForm, useFieldArray } from "react-hook-form";
import toast from "react-hot-toast";
import RHFOption from "../Inputs/RHFOption";
import RHFInput from "../Inputs/RHFInput";
import UserSVG from "../svg/UserSVG";
import DescriptionSVG from "../svg/DescriptionSVG";
import { Button, IconButton } from "@/styles/ButtonStyles";
import { IconWrapper } from "@/styles/GlobalStyles";
import LoaderSVG from "../svg/LoaderSVG";
import CalendarSVG from "../svg/CalendarSVG";
import MinusSVG from "../svg/MinusSVG";
import PlusSVG from "../svg/PlusSVG";
import DownloadSVG from "../svg/DownloadSVG";
import DownloadFileButton from "../Buttons/DownloadFileButton";
import RHFUserSelect from "../Inputs/RHFUserSelect";

type TicketFormProps = {
  updateMode: {
    initialTicket: TUpdateTicket;
    id: string;
  };
};

export default function UpdateTicketForm({ updateMode }: TicketFormProps) {
  const {
    formState: { errors, isSubmitting },
    control,
    register,
    handleSubmit,
  } = useForm<TUpdateTicket>({
    defaultValues: {
      ...updateMode.initialTicket,
      files: updateMode.initialTicket.files.map((file) => ({
        value: file,
      })),
    },
    resolver: zodResolver(ticketUpdateValidationSchema),
  });

  const { fields, append, remove } = useFieldArray({ control, name: "files" });

  const onSubmit: SubmitHandler<TCreateTicket | TUpdateTicket> = async (
    data
  ) => {
    try {
      const formdata = new FormData();
      (Object.keys(data) as Array<keyof typeof data>).map((key) => {
        if (key === "files") {
          data.files.map((file: { value: FileList | string }) => {
            if (typeof file.value === "string") {
              formdata.append(key, file.value);
            } else {
              formdata.append(key, file.value[0]);
            }
          });
        } else {
          formdata.append(key, data[key]);
        }
      });
      await axios({
        method: "PUT",
        url: `/api/tickets/${updateMode.id}`,
        data: formdata,
      });
      toast.success("Ticket actualizado");
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error(JSON.stringify(errorMessage));
    }
  };

  return (
    <FormStyles onSubmit={handleSubmit(onSubmit)}>
      <p style={{ fontSize: "2rem", color: "var(--text)", fontWeight: 600 }}>
        Actualizar ticket
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

      <RHFUserSelect
        config={{
          name: "user_asigned",
          placeholder: "Asignado",
          icon: <UserSVG />,
        }}
        control={control}
        error={errors.user_asigned?.message}
        url="/api/users"
      />

      <RHFOption
        config={{
          data: TICKET_STATUS,
          name: "status",
          placeholder: "Estado",
        }}
        register={register("status")}
        control={control}
        error={errors.status?.message}
      />

      <RHFOption
        config={{
          data: TICKET_PRIORITIES,
          name: "priority",
          placeholder: "Prioridad",
        }}
        register={register("priority")}
        control={control}
        error={errors.priority?.message}
      />

      <RHFInput
        config={{
          name: "close_date",
          icon: <CalendarSVG />,
          type: "date",
          placeholder: "Cerrado",
        }}
        control={control}
        error={errors.close_date?.message}
        register={register("close_date")}
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
        {fields.map((field, index) => {
          return (
            <div
              key={field.id}
              style={{
                display: "flex",
                margin: "0.5rem 0",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {typeof field.value !== "object" ? (
                <>
                  <p>{field.value}</p>
                  <DownloadFileButton fileId={field.value} />
                </>
              ) : (
                <input
                  type="file"
                  {...register(`files.${index}.value`)}
                  accept="image/*,.pdf,.docx"
                />
              )}
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
          );
        })}
        <IconButton
          title="añadir elemento"
          type="button"
          $m="auto"
          $size="1.375rem"
          $color="primary"
          onClick={() => append({ value: null })}
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
