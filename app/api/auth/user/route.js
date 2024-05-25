import { getDataFromToken } from "@/backend/helper/getDataFromToken";

const { connect } = require("@/backend/config/dbConfig");
const { User } = require("@/backend/model/UserModel");
const { BenefitTransaction } = require("@/backend/model/BenefitTransaction");
const { ExpenseTransaction } = require("@/backend/model/ExpenseTransaction");
const {
  InvestmentTransaction,
} = require("@/backend/model/InvestmentTransaction");
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

/**
 * Delete a user by token
 * @param {*} NextRequest
 * @returns user data
 */
export async function DELETE(request) {
  try {
    const userId = await getDataFromToken(request);
    const user = await User.findOneAndDelete({ _id: userId });
    // Delete on cascade all transactions related to the user
    await BenefitTransaction.deleteMany({ userId: userId });
    await ExpenseTransaction.deleteMany({ userId: userId });
    await InvestmentTransaction.deleteMany({ userId: userId });
    const response = NextResponse.json({
      message: "Has eliminado correctamente tu cuenta.",
      data: user,
    });

    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Ha ocurrido un error. Por favor, contacte con soporte" },
      { status: 400 }
    );
  }
}
