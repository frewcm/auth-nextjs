import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbconfig";
import User from "@/model/userModel";

connect();

export async function GET(request: NextRequest) {
  try {
    const user_id = await getDataFromToken(request);
    const user = await User.findOne({ _id: user_id }).select("-password");
    return NextResponse.json({
      message: "User found",
      data: user,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
