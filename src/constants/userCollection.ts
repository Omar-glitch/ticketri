import { userBaseSchema } from "@/schemas/UserSchema";
import { ObjectId } from "mongodb";
import { z } from "zod";

export const USERS_COLLECTION = "users";

export const userEntitySchema = z.object({
  _id: z.instanceof(ObjectId),
  name: userBaseSchema.shape.name,
  email: userBaseSchema.shape.email,
  password: userBaseSchema.shape.password,
  role: userBaseSchema.shape.role,
  area: userBaseSchema.shape.area,
});

export type UserEntity = z.infer<typeof userEntitySchema>;
