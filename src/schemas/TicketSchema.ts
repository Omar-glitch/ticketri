import { z } from "zod";

export const TICKET_CATEGORIES = [
  "hardware",
  "software",
  "network",
  "email",
  "phone",
];

export const TICKET_STATUS = [
  "new",
  "assigned",
  "in progress",
  "closed",
  "canceled",
];

export const TICKET_PRIORITIES = ["unknown", "low", "medium", "high", "urgent"];

export const ticketBaseSchema = z.object({
  user: z.string().toLowerCase().trim(),
  area: z.enum([
    "it",
    "finance",
    "human resources",
    "marketing",
    "production",
    "logistic",
    "customer support",
  ]),
  category: z.enum(["hardware", "software", "network", "email", "phone"]),
  priority: z.enum(["unknown", "low", "medium", "high", "urgent"]),
  description: z.string().min(6).max(200),
  status: z.enum(["new", "assigned", "in progress", "closed", "canceled"]),
  user_asigned: z.string().optional(),
  files: z
    .any()
    .array()
    .max(5)
    .refine(
      (val) => {
        if (!val.length) return true;
        if (typeof val[0] === "string") return true;

        const a = val.every((v: { value: FileList | string }) => {
          if (!v.value) return false;
          if (typeof v.value === "string") return true;
          return Boolean(v.value.length);
        });
        return a;
      },
      { message: "cannot be null or undefined" }
    ),
  close_date: z.string().optional(),
});

export const ticketDTOSchema = z.object({
  id: z.string().regex(/^[0-9a-f]{24}$/),
  user: ticketBaseSchema.shape.user,
  area: ticketBaseSchema.shape.area,
  priority: ticketBaseSchema.shape.priority,
  category: ticketBaseSchema.shape.category,
  description: ticketBaseSchema.shape.description,
  status: ticketBaseSchema.shape.status,
  user_asigned: ticketBaseSchema.shape.user_asigned,
  files: ticketBaseSchema.shape.files,
  close_date: ticketBaseSchema.shape.close_date,
});

export type TicketDTO = z.infer<typeof ticketDTOSchema>;

export const TicketDTO = {
  convertFromEntity(entity: any): TicketDTO {
    const candidate: TicketDTO = {
      id: entity._id.toHexString(),
      user: entity.user,
      area: entity.area,
      priority: entity.priority,
      category: entity.category,
      description: entity.description,
      status: entity.status,
      files: entity.files,
      user_asigned: entity.user_asigned,
      close_date: entity.close_date,
    };
    return ticketDTOSchema.parse(candidate);
  },
};

export const ticketValidationSchema = z.object({
  category: ticketBaseSchema.shape.category,
  description: ticketBaseSchema.shape.description,
  files: ticketBaseSchema.shape.files,
});

export type TCreateTicket = z.infer<typeof ticketValidationSchema>;

export const TCreateTicket = {
  convertFromEntity(entity: any): TCreateTicket {
    const candidate: TCreateTicket = {
      category: entity.category,
      description: entity.description,
      files: entity.files,
    };
    return ticketValidationSchema.parse(candidate);
  },
};

export const ticketUpdateValidationSchema = z.object({
  category: ticketBaseSchema.shape.category,
  user_asigned: ticketBaseSchema.shape.user_asigned,
  description: ticketBaseSchema.shape.description,
  files: ticketBaseSchema.shape.files,
  status: ticketBaseSchema.shape.status,
  priority: ticketBaseSchema.shape.priority,
  close_date: ticketBaseSchema.shape.close_date,
});

export type TUpdateTicket = z.infer<typeof ticketUpdateValidationSchema>;

export const TUpdateTicket = {
  convertFromEntity(entity: any): TUpdateTicket {
    const candidate: TUpdateTicket = {
      category: entity.category,
      user_asigned: entity.user_asigned,
      description: entity.description,
      status: entity.status,
      priority: entity.priority,
      close_date: entity.close_date,
      files: entity.files,
    };
    return ticketUpdateValidationSchema.parse(candidate);
  },
};
