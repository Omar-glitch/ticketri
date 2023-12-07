import { auth, isAdmin, isAuthenticated } from "@/auth";
import { formidablePromise } from "@/lib/formidable";
import clientPromise from "@/lib/mongodb";
import { TicketDTO, ticketBaseSchema } from "@/schemas/TicketSchema";
import {
  deleteFileFromBucket,
  getDownloadURLFileBucket,
  saveFiles,
  uploadFileToBucket,
} from "@/utils/bucketFiles";
import getErrorMessage from "@/utils/errorResponses";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { USERS_COLLECTION, UserEntity } from "../users/route";

const DATABASE = process.env.MONGODB_DATABASE;
const TICKETS_COLLECTION = "tickets";

export const ticketEntitySchema = z.object({
  _id: z.instanceof(ObjectId),
  user: ticketBaseSchema.shape.user,
  area: ticketBaseSchema.shape.area,
  category: ticketBaseSchema.shape.category,
  description: ticketBaseSchema.shape.description,
  status: ticketBaseSchema.shape.status,
  user_asigned: ticketBaseSchema.shape.user_asigned,
  files: z.string().array(),
  close_date: ticketBaseSchema.shape.close_date,
});

export type TicketEntity = z.infer<typeof ticketEntitySchema>;

export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db(DATABASE);
    const tickets = await db
      .collection<TicketEntity>(TICKETS_COLLECTION)
      .find({})
      .toArray();
    return NextResponse.json(
      tickets.map((ticket) => TicketDTO.convertFromEntity(ticket))
    );
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    return NextResponse.json(errorMessage, { status: 400 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json("Not logged in", { status: 401 });

    if (!isAuthenticated(session))
      return NextResponse.json("Not enough privileges", { status: 401 });
    console.log("clientPromise");
    const client = await clientPromise;
    const db = client.db(DATABASE);
    const userResponsable = await db
      .collection<UserEntity>(USERS_COLLECTION)
      .findOne({ name: session.user.name || "_unknown_" });

    if (!userResponsable)
      return NextResponse.json("UserResponsable does not exist", {
        status: 401,
      });
    console.log(userResponsable);
    console.log(userResponsable.name);
    console.log(session.user.name);

    const formdata = await req.formData();
    const files = formdata.getAll("files") as File[] | null;
    const fileNamesAdded = await saveFiles(files);
    const newTicket = ticketEntitySchema.parse({
      _id: new ObjectId(),
      area: userResponsable.area,
      user: userResponsable.name,
      category: formdata.get("category"),
      description: formdata.get("description"),
      status: "new",
      user_asigned: "",
      close_date: "",
      files: fileNamesAdded,
    });
    console.log(newTicket);
    const { insertedId } = await db
      .collection<TicketEntity>(TICKETS_COLLECTION)
      .insertOne(newTicket);
    console.log(newTicket, insertedId);
    return NextResponse.json(
      TicketDTO.convertFromEntity({ ...newTicket, _id: insertedId })
    );
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    console.log(errorMessage);
    return NextResponse.json(errorMessage, { status: 400 });
  }
}

// const client = await clientPromise;
// const db = client.db(DATABASE);
// const session = await auth();
// if (!isAdmin(session))
//   return NextResponse.json("Not enough privileges", { status: 401 });
// const body = await req.json();
// const newTicket = ticketEntitySchema.parse({
//   ...body,
//   _id: new ObjectId(),
// });
// const { insertedId } = await db
//   .collection<TicketEntity>(TICKETS_COLLECTION)
//   .insertOne(newTicket);
// return NextResponse.json(
//   TicketDTO.convertFromEntity({ ...body, _id: insertedId })
// );
