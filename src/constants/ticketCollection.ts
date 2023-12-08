import { ticketBaseSchema } from "@/schemas/TicketSchema";
import { ObjectId } from "mongodb";
import { z } from "zod";

export const TICKETS_COLLECTION = "tickets";

export const ticketEntitySchema = z.object({
  _id: z.instanceof(ObjectId),
  user: ticketBaseSchema.shape.user,
  area: ticketBaseSchema.shape.area,
  category: ticketBaseSchema.shape.category,
  priority: ticketBaseSchema.shape.priority,
  description: ticketBaseSchema.shape.description,
  status: ticketBaseSchema.shape.status,
  user_asigned: ticketBaseSchema.shape.user_asigned,
  files: z.string().array(),
  close_date: ticketBaseSchema.shape.close_date,
});

export type TicketEntity = z.infer<typeof ticketEntitySchema>;
