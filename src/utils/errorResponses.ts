import axios from "axios";
import { ZodError } from "zod";

export default function getErrorMessage(error: unknown): string {
  if (typeof error === "string") return error;
  if (axios.isAxiosError(error))
    return error.response?.data || "Error con axios";
  if (error instanceof ZodError) return error.message;
  if (error instanceof Error) return error.message;
  return "Something went wrong";
}
