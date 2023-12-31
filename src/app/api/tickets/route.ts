import { auth, isAuthenticated } from "@/auth";
import clientPromise from "@/lib/mongodb";
import { TicketDTO } from "@/schemas/TicketSchema";
import { saveFiles } from "@/utils/bucketFiles";
import getErrorMessage from "@/utils/errorResponses";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import {
  TICKETS_COLLECTION,
  TicketEntity,
  ticketEntitySchema,
} from "@/constants/ticketCollection";
import { USERS_COLLECTION, UserEntity } from "@/constants/userCollection";

const DATABASE = process.env.MONGODB_DATABASE;
export const dynamic = 'force-dynamic'

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
      priority: "unknown",
      user_asigned: "",
      close_date: "",
      files: fileNamesAdded,
    });
    const { insertedId } = await db
      .collection<TicketEntity>(TICKETS_COLLECTION)
      .insertOne(newTicket);
    return NextResponse.json(
      TicketDTO.convertFromEntity({ ...newTicket, _id: insertedId })
    );
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    console.log(errorMessage);
    return NextResponse.json(errorMessage, { status: 400 });
  }
}
