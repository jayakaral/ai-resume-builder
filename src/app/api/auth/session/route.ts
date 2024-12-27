import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export const GET = async () => {
    const session = await auth();
    return NextResponse.json(session);
}