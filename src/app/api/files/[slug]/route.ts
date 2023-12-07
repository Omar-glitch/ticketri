import { getDownloadURLFileBucket } from "@/utils/bucketFiles";
import getErrorMessage from "@/utils/errorResponses";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params: { slug } }: { params: { slug: string } }
) {
  try {
    const fileDownloadUrl = await getDownloadURLFileBucket(slug);
    if (fileDownloadUrl.error) {
      return NextResponse.json("file not found", { status: 404 });
    }
    return NextResponse.json({ message: fileDownloadUrl.message });
  } catch (error) {
    return NextResponse.json(getErrorMessage(error), { status: 400 });
  }
}
