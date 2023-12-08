import clientPromise from "@/lib/mongodb";
import { UserDTO } from "@/schemas/UserSchema";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import getErrorMessage from "@/utils/errorResponses";
import { encrypt } from "@/lib/cypher";
import { auth, isAdmin } from "@/auth";
import {
  USERS_COLLECTION,
  UserEntity,
  userEntitySchema,
} from "@/constants/userCollection";

const DATABASE = process.env.MONGODB_DATABASE;

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db(DATABASE);
    const users = await db
      .collection<UserEntity>(USERS_COLLECTION)
      .find({})
      .sort({})
      .project({ password: 0 })
      .toArray();
    return NextResponse.json(
      users.map((user) => UserDTO.convertFromEntity(user))
    );
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    return NextResponse.json(errorMessage, { status: 400 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db(DATABASE);
    const session = await auth();

    if (!isAdmin(session))
      return NextResponse.json("Not enough privileges", { status: 401 });

    const body = await req.json();
    const hashedPassword = encrypt(body.password);
    const newUser = userEntitySchema.parse({
      ...body,
      password: hashedPassword,
      _id: new ObjectId(),
    });

    const duplicatedUser = await db
      .collection<UserEntity>(USERS_COLLECTION)
      .findOne({ $or: [{ email: newUser.email, name: newUser.name }] });
    if (duplicatedUser)
      return NextResponse.json("Duplicated user", { status: 400 });

    const { insertedId } = await db
      .collection<UserEntity>(USERS_COLLECTION)
      .insertOne(newUser);
    return NextResponse.json(
      UserDTO.convertFromEntity({ ...body, _id: insertedId })
    );
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    return NextResponse.json(errorMessage, { status: 400 });
  }
}
