import { getDataFromToken } from "@/backend/helper/getDataFromToken";

const { connect } = require("@/backend/config/dbConfig");
const { User } = require("@/backend/model/UserModel");
const { NextResponse } = require("next/server");

/*
 * Connect to the database
 */
connect();

/**
 * Get a user by token
 * @param {*} NextRequest
 * @returns user data
 */
export async function GET(request) {
  try {
    const userId = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password");
    return NextResponse.json({
      message: "Usuario no encontrado",
      data: user,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
