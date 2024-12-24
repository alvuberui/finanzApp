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
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(403).json({ error: "Falta el refresh token" });
        }
        jwt.verify(refreshToken, SECRET_KEY, (err, user) => {
            if (err) return res.status(403).json({ error: "Token inválido" });
            const newToken = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: "15m" });
            return res.status(200).json({ token: newToken });
        });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}