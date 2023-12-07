import clientPromise from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { UserEntity, userEntitySchema } from "../route";
import { ObjectId } from "bson";
import { TCreateUser } from "@/schemas/UserSchema";
import getErrorMessage from "@/utils/errorResponses";
import { auth, isAdmin } from "@/auth";
import { decrypt } from "@/lib/cypher";

const DATABASE = process.env.MONGODB_DATABASE;
const USERS_COLLECTION = "users";

export async function GET(
  req: NextRequest,
  { params: { slug } }: { params: { slug: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db(DATABASE);

    const user = await db
      .collection<UserEntity>(USERS_COLLECTION)
      .findOne({ _id: new ObjectId(slug) });

    if (!user) return NextResponse.json("user not found", { status: 404 });
    return NextResponse.json(
      TCreateUser.convertFromEntity({
        ...user,
        password: decrypt(user.password),
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
    const updatedUser = userEntitySchema
      .omit({ _id: true })
      .partial()
      .parse(body);
    const insertedUpdatedUser = await db
      .collection<UserEntity>(USERS_COLLECTION)
      .findOneAndUpdate(
        {
          _id: new ObjectId(slug),
        },
        { $set: updatedUser },
        { returnDocument: "after" }
      );
    return NextResponse.json(
      insertedUpdatedUser
        ? TCreateUser.convertFromEntity(insertedUpdatedUser)
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
    await db.collection<UserEntity>(USERS_COLLECTION).deleteOne({
      _id: new ObjectId(slug),
    });
    return NextResponse.json({ message: "Usuario eliminado", _id: slug });
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    return NextResponse.json(errorMessage, { status: 400 });
  }
}
