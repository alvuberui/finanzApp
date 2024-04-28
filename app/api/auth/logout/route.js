const { connect } = require("@/backend/config/dbConfig");
const { NextResponse } = require("next/server");


connect();

/*
 *  Logout route
 */
export async function GET(request) {
    try {
        const response = NextResponse.json(
            {
                message: "Sesión cerrada correctamente",
                success: true,
            }
        )
        response.cookies.set("token", "",
            {
                httpOnly: true, expires: new Date(0)
            })

        return response;

    } catch (error) {
        return NextResponse.json({ error: error.message },
            { status: 500 });
    }
}