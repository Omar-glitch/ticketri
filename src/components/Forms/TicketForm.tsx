"use client";

import {
  TCreateTicket,
  TICKET_STATUS,
  ticketValidationSchema,
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
import FileArrayInput from "../Inputs/FileArrayInput";

type TicketFormProps = {
  updateMode?: {
    initialTicket: TCreateTicket;
    id: string;
  };
};

const DEFAULT_TICKET: TCreateTicket = {
  category: "hardware",
  description: "",
  files: [],
  // status: "new",
  // user: "",
  // user_asigned: "",
  // close_date: "",
};

// const submitForm = (data) => {
//   const formData = new FormData();

//   formData.append("files", data.picture[0]);
//   data = { ...data, picture: data.picture[0].name };
//   formData.append("recipe", JSON.stringify(data));

//   return fetch("/api/recipes/create", {
//     method: "POST",
//     body: formData,
//   }).then((response) => {
//     if (response.ok) {
//       // Handle successful upload
//     } else {
//       // Handle error
//     }
//   });
// };

export default function TicketForm({ updateMode }: TicketFormProps) {
  const updating = updateMode !== undefined;
  const {
    formState: { errors, isSubmitting },
    control,
    register,
    handleSubmit,
    reset,
  } = useForm<TCreateTicket>({
    defaultValues: updating ? updateMode.initialTicket : DEFAULT_TICKET,
    resolver: zodResolver(ticketValidationSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "files",
  });

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
        method: updating ? "PUT" : "POST",
        url: updating ? `/api/tickets/${updateMode.id}` : "/api/tickets",
        data: formdata,
      });
      if (!updating) reset();
      toast.success(updating ? "Ticket actualizado" : "Ticket agregado");
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error(JSON.stringify(errorMessage));
    }
  };

  // const onSubmit: SubmitHandler<TCreateTicket> = async (data) => {
  //   try {
  //     await axios({
  //       method: updating ? "PUT" : "POST",
  //       url: updating ? `/api/tickets/${updateMode.id}` : "/api/tickets",
  //       data,
  //       headers: { "Content-Type": "application/json" },
  //     });
  //     if (!updating) reset();
  //     toast.success(updating ? "Ticket actualizado" : "Ticket agregado");
  //   } catch (error) {
  //     const errorMessage = getErrorMessage(error);
  //     toast.error(JSON.stringify(errorMessage));
  //   }
  // };

  return (
    <FormStyles onSubmit={handleSubmit(onSubmit)}>
      <p style={{ fontSize: "2rem", color: "var(--text)", fontWeight: 600 }}>
        {updating ? "Actualizar ticket" : "Crear ticket"}
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

      {/* <RHFInput
        config={{
          name: "user",
          icon: <UserSVG />,
          placeholder: "Usuario",
        }}
        control={control}
        error={errors.user?.message}
        register={register("user")}
      /> */}

      {/* <RHFInput
        config={{
          name: "user_asigned",
          icon: <UserSVG />,
          placeholder: "Asignado",
        }}
        control={control}
        error={errors.user_asigned?.message}
        register={register("user_asigned")}
      /> */}

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

      {/* <RHFOption
        config={{
          data: TICKET_STATUS,
          name: "status",
          placeholder: "Estado",
        }}
        register={register("status")}
        control={control}
        error={errors.status?.message}
      /> */}

      {/* <RHFInput
        config={{
          name: "close_date",
          icon: <CalendarSVG />,
          type: "date",
          placeholder: "Cerrado",
        }}
        control={control}
        error={errors.close_date?.message}
        register={register("close_date")}
      /> */}

      {/* <FileArrayInput control={control} error="" register={register(`files`)} /> */}

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
              $color="error"
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
          onClick={() => append("")}
        >
          <PlusSVG />
        </IconButton>
      </div>
      <p style={{ color: "var(--error)", fontSize: "0.75rem", margin: "auto" }}>
        {" "}
        {errors.files?.message}{" "}
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
