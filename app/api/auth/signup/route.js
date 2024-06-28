const { connect } = require("@/backend/config/dbConfig");
const { User } = require("@/backend/model/UserModel");
const { NextResponse } = require("next/server");
const bcryptjs = require("bcryptjs");
const { validateUser } = require("@/backend/validation/UserValidation");
import jwt from "jsonwebtoken";

/*
 * Connect to the database
 */
connect();

/*
 * POST /api/auth/signup
 * Create a new user
 */
async function POST(request) {
  try {
    const reqBody = await request.json();
    const {
      name,
      firstName,
      lastName,
      birthDate,
      currentMoney,
      email,
      password,
    } = reqBody;
    const user = await User.findOne({ email });

    const isCorrect = await validateUser(reqBody);

    // Check if the user input is valid
    if (isCorrect !== true) {
      return NextResponse.json({ error: validateUser }, { status: 400 });
    }

    // Unique validations
    if (user) {
      return NextResponse.json(
        { error: "Ya existe un correo con el email" },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      name,
      firstName,
      lastName,
      birthDate,
      currentMoney,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    // Delete password from response and money
    savedUser.password = undefined;
    savedUser.currentMoney = undefined;

    const tokenData = {
      id: savedUser._id,
      email: savedUser.email,
      name: savedUser.name,
    };

    /*
     * Create a token with expiration 1 day
     */
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Usuario creado correctamente",
      user: savedUser,
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

module.exports = { POST };
