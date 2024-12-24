import jwt from "jsonwebtoken";
const { connect } = require("@/backend/config/dbConfig");
const { User } = require("@/backend/model/UserModel");
const { NextRequest, NextResponse } = require("next/server");
const bcryptjs = require("bcryptjs");

connect();

const SECRET_KEY = process.env.TOKEN_SECRET || "your_secret_key";

/*
 *  Login route
 */
export async function POST(request) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        /*
         * Check if the email exists. 
         */
        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json(
                { error: "Este email no existe. Por favor, crea una cuenta." },
                { status: 400 }
            );
        }

        /*
         * Check if the password is correct
         */
        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json(
                { error: "La contraseña es incorrecta" },
                { status: 400 }
            );
        }

        /* 
         * Create token data
         */
        const tokenData = {
            id: user._id,
            email: user.email,
            name: user.name,
        };

        /*
         * Create a token and refreshToken
         */
        const token = jwt.sign(tokenData, SECRET_KEY, { expiresIn: "15m" });
        const refreshToken = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, { expiresIn: "7d" });

        // Sanitize user object
        user.password = undefined;
        user.currentMoney = undefined;

        /*
         * Send a successful response
         */
        const response = NextResponse.json({
            message: "Sesión iniciada correctamente",
            user: user,
            success: true,
            token,
        });

        /*
         * Set the tokens in cookies
         */
        response.cookies.set("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            path: "/api",
            sameSite: "strict",
        });

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: true,
            path: "/api",
            sameSite: "strict",
        });

        return response;

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}