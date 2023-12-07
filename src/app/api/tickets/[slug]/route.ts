import clientPromise from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "bson";
import getErrorMessage from "@/utils/errorResponses";
import { auth, isAdmin } from "@/auth";
import { TicketEntity, ticketEntitySchema } from "../route";
import { TCreateTicket } from "@/schemas/TicketSchema";

const DATABASE = process.env.MONGODB_DATABASE;
const TICKETS_COLLECTION = "tickets";

export async function GET(
  req: NextRequest,
  { params: { slug } }: { params: { slug: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db(DATABASE);

    const ticket = await db
      .collection<TicketEntity>(TICKETS_COLLECTION)
      .findOne({ _id: new ObjectId(slug) });

    if (!ticket) return NextResponse.json("ticket not found", { status: 404 });
    return NextResponse.json(
      TCreateTicket.convertFromEntity({
        ...ticket,
      })
    );
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    return NextResponse.json(errorMessage, { status: 400 });
  }
}

export async function PUT(
  req: NextRequest,
  { params: { slug } }: { params: { slug: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db(DATABASE);
    const session = await auth();
    if (!isAdmin(session))
      return NextResponse.json("Not enough privileges", { status: 401 });
    const body = await req.json();
    const updatedTicket = ticketEntitySchema
      .omit({ _id: true })
      .partial()
      .parse(body);
    const insertedUpdatedTicket = await db
      .collection<TicketEntity>(TICKETS_COLLECTION)
      .findOneAndUpdate(
        {
          _id: new ObjectId(slug),
        },
        { $set: updatedTicket },
        { returnDocument: "after" }
      );
    return NextResponse.json(
      insertedUpdatedTicket
        ? TCreateTicket.convertFromEntity(insertedUpdatedTicket)
        : null
    );
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    return NextResponse.json(errorMessage, { status: 400 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params: { slug } }: { params: { slug: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db(DATABASE);
    const session = await auth();
    if (!isAdmin(session))
      return NextResponse.json("Not enough privileges", { status: 401 });
    await db.collection<TicketEntity>(TICKETS_COLLECTION).deleteOne({
      _id: new ObjectId(slug),
    });
    return NextResponse.json({ message: "Ticket eliminado", _id: slug });
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    return NextResponse.json(errorMessage, { status: 400 });
  }
}
