"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TCreateUser,
  USER_AREAS,
  USER_ROLES,
  userValidationSchema,
} from "@/schemas/UserSchema";
import RHFInput from "../Inputs/RHFInput";
import UserSVG from "../svg/UserSVG";
import { Button } from "@/styles/ButtonStyles";
import KeySVG from "../svg/KeySVG";
import MailSVG from "../svg/MailSVG";
import axios from "axios";
import toast from "react-hot-toast";
import { IconWrapper } from "@/styles/GlobalStyles";
import LoaderSVG from "../svg/LoaderSVG";
import { FormStyles } from "@/styles/InputStyles";
import getErrorMessage from "@/utils/errorResponses";
import RHFOption from "../Inputs/RHFOption";

type UsersFormProps = {
  updateMode?: {
    initialUser: TCreateUser;
    id: string;
  };
};

const DEFAULT_USER: TCreateUser = {
  name: "",
  email: "",
  password: "",
  role: "user",
  area: "marketing",
};

export default function UsersForm({ updateMode }: UsersFormProps) {
  const updating = updateMode !== undefined;
  const {
    formState: { errors, isSubmitting },
    control,
    register,
    handleSubmit,
    reset,
  } = useForm<TCreateUser>({
    defaultValues: updating ? updateMode.initialUser : DEFAULT_USER,
    resolver: zodResolver(userValidationSchema),
  });

  const onSubmit: SubmitHandler<TCreateUser> = async (data) => {
    try {
      const res = await axios({
        method: updating ? "PUT" : "POST",
        url: updating ? `/api/users/${updateMode.id}` : "/api/users",
        data,
        headers: { "Content-Type": "application/json" },
      });
      if (!updating) reset();
      toast.success(updating ? "Usuario actualizado" : "Usuario agregado");
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error(JSON.stringify(errorMessage));
    }
  };

  return (
    <FormStyles onSubmit={handleSubmit(onSubmit)}>
      <p style={{ fontSize: "2rem", color: "var(--text)", fontWeight: 600 }}>
        {updating ? "Actualizar usuario" : "Crear usuario"}
      </p>
      <RHFInput
        config={{
          name: "name",
          icon: <UserSVG />,
          placeholder: "Nombre",
        }}
        control={control}
        error={errors.name?.message}
        register={register("name")}
      />
      <RHFInput
        config={{
          name: "password",
          icon: <KeySVG />,
          type: "password",
          placeholder: "Contraseña",
        }}
        control={control}
        error={errors.password?.message}
        register={register("password")}
      />
      <RHFInput
        config={{
          name: "email",
          icon: <MailSVG />,
          type: "email",
          placeholder: "E-mail",
        }}
        control={control}
        error={errors.email?.message}
        register={register("email")}
      />
      <RHFOption
        config={{ data: USER_ROLES, name: "role", placeholder: "Rol" }}
        control={control}
        error={errors.role?.message}
        register={register("role")}
      />

      <RHFOption
        config={{ data: USER_AREAS, name: "area", placeholder: "Area" }}
        control={control}
        error={errors.area?.message}
        register={register("area")}
      />

      <Button $color="primary" disabled={isSubmitting}>
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
