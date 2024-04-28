const { connect } = require("@/backend/config/dbConfig");
const { User } = require("@/backend/model/UserModel");
const { NextRequest, NextResponse } = require("next/server");
const bcryptjs = require("bcryptjs");
import jwt from "jsonwebtoken"

connect();

/*
 *  Login route
 */
export async function POST(request){
    try {
        const reqBody = await request.json()
        const {email, password} = reqBody

        /*
         * Check if the email exists. 
         */
        const user = await User.findOne({email})

        if(!user){
            return NextResponse.json({error: "Este email no existe. Por favor, crea una cuenta."}, {status: 400})
        }
        
        /*
         * Check if the password is correct
         */
        const validPassword = await bcryptjs.compare
        (password, user.password)
        if(!validPassword){
            return NextResponse.json({error: "La contraseña es incorrecta"}, {status: 400})
        }

        /* Create token data
         * A JavaScript object (tokenData) is created to store essential user 
         * information. In this case, it includes the user's unique identifier (id), and email
         */
        const tokenData = {
            id: user._id,
            email: user.email,
            name: user.name
        }
        
        /*
         * Create a token with expiration 1 day
         */
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, {expiresIn: "1d"})
        
        user.password = undefined;
        user.currentMoney = undefined;


        /*
         * Send a successful response
         */
        const response = NextResponse.json({
            message: "Sesión iniciada correctamente",
            user: user,
            success: true,
        })

        /*
         * Set the token in a cookie
         */
        response.cookies.set("token", token, {
            httpOnly: true,
        })

        return response;

    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}

