import { z } from "zod";

export const USER_ROLES = ["admin", "user"];
export const USER_AREAS = [
  "it",
  "finance",
  "human resources",
  "marketing",
  "production",
  "logistic",
  "customer support",
];

export const userBaseSchema = z.object({
  name: z.string().toLowerCase().trim().min(3).max(32),
  email: z.string().toLowerCase().trim().email().min(5).max(75),
  password: z.string().trim().min(3).max(100),
  role: z.enum(["admin", "user"]),
  area: z.enum([
    "it",
    "finance",
    "human resources",
    "marketing",
    "production",
    "logistic",
    "customer support",
  ]),
});

export const userDTOSchema = z.object({
  id: z.string().regex(/^[0-9a-f]{24}$/),
  name: userBaseSchema.shape.name,
  email: userBaseSchema.shape.email,
  role: userBaseSchema.shape.role,
  area: userBaseSchema.shape.area,
});

export type UserDTO = z.infer<typeof userDTOSchema>;

export const UserDTO = {
  convertFromEntity(entity: any): UserDTO {
    const candidate: UserDTO = {
      id: entity._id.toHexString(),
      name: entity.name,
      email: entity.email,
      role: entity.role,
      area: entity.area,
    };
    return userDTOSchema.parse(candidate);
  },
};

export const userValidationSchema = z.object({
  name: userBaseSchema.shape.name,
  email: userBaseSchema.shape.email,
  password: userBaseSchema.shape.password,
  role: userBaseSchema.shape.role,
  area: userBaseSchema.shape.area,
});

export type TCreateUser = z.infer<typeof userValidationSchema>;

export const TCreateUser = {
  convertFromEntity(entity: any): TCreateUser {
    const candidate: TCreateUser = {
      name: entity.name,
      email: entity.email,
      role: entity.role,
      password: entity.password,
      area: entity.area,
    };
    return userValidationSchema.parse(candidate);
  },
};
