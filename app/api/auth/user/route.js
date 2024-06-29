import { getDataFromToken } from "@/backend/helper/getDataFromToken";
import { validateUpdateUser } from "@/backend/validation/UserValidation";

const { connect } = require("@/backend/config/dbConfig");
const { User } = require("@/backend/model/UserModel");
const { BenefitTransaction } = require("@/backend/model/BenefitTransaction");
const { ExpenseTransaction } = require("@/backend/model/ExpenseTransaction");
const {
  InvestmentTransaction,
} = require("@/backend/model/InvestmentTransaction");
const { NextResponse } = require("next/server");
const bcryptjs = require("bcryptjs");

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

/**
 * update user data
 * @param {*} NextRequest
 * @returns user data
 */
export async function PUT(request) {
  try {
    const userId = await getDataFromToken(request);
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 400 }
      );
    }
    const requestBody = await request.json();
    const isCorrect = await validateUpdateUser(requestBody);
    if (isCorrect !== true) {
      return NextResponse.json({ error: isCorrect }, { status: 400 });
    }

    const { name, firstName, lastName, birthDate, currentMoney, email } = requestBody;
    user.name = name;
    user.firstName = firstName;
    user.lastName = lastName;
    user.birthDate = birthDate;
    user.currentMoney = currentMoney;
    user.email = email;
    const updatedUser = await User.findOneAndReplace({ _id: userId }, user, {
      new: true,
    });

    console.log(updatedUser);

    return NextResponse.json({
      message: "Datos actualizados correctamente",
      data: updatedUser,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error inesperado, por favor, contacte con soporte." },
      { status: 400 }
    );
  }
}

/**
 * Update user password
 * @param {*} NextRequest
 * @returns NextResponse
 */
export async function PATCH(request) {
  try {
    const userId = await getDataFromToken(request);
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 400 }
      );
    }
    const { newPassword, currentPassword } = await request.json();

    const isMatch = await bcryptjs.compare(currentPassword, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "La contraseña actual no coincide" },
        { status: 400 }
      );
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(newPassword, salt);
    user.password = hashedPassword;
    const updatedUser = await User.findOneAndReplace({ _id: userId }, user, {
      new: true,
    });

    return NextResponse.json({
      message: "Contraseña actualizada correctamente",
      data: updatedUser,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error inesperado, por favor, contacte con soporte." },
      { status: 400 }
    );
  }
}
