import { NextRequest, NextResponse } from "next/server";

export default (req: NextRequest, res: NextResponse) => {
  return NextResponse.json({ name: "John Doe" });
};
