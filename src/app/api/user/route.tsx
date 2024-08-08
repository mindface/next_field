import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    return NextResponse.json({ name: "John Doe" });
  } catch (error) {
    throw error;
  }
}
