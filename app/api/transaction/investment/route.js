const { connect } = require("@/backend/config/dbConfig");
const { getDataFromToken } = require("@/backend/helper/getDataFromToken");
const {
  InvestmentTransaction,
} = require("@/backend/model/InvestmentTransaction");
const {
  validateInvestmentTransaction,
} = require("@/backend/validation/InvestmentTransactionValidation");
const { NextResponse } = require("next/server");

/*
 * Connect to the database
 */
connect();

/*
 * POST /api/transaction/investment/create
 * Create a a new expense transaction
 */
async function POST(request) {
  try {
    const reqBody = await request.json();
    const isValid = await validateInvestmentTransaction(reqBody);

    if (!isValid) {
      return NextResponse.json({ error: "Valores inválidos" }, { status: 400 });
    }

    const userId = getDataFromToken(request);
    reqBody.userId = userId;
    reqBody.type = "investment";

    const newInvestmentTransaction = new InvestmentTransaction(reqBody);
    const savedInvestment = await newInvestmentTransaction.save();
    return NextResponse.json({
      message: "Inversión creada correctamente",
      data: savedInvestment,
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

module.exports = { POST };
