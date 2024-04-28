const { connect } = require("@/backend/config/dbConfig");
const { getDataFromToken } = require("@/backend/helper/getDataFromToken");
const { BenefitTransaction } = require("@/backend/model/BenefitTransaction");
const {
  validateBenefitTransaction,
} = require("@/backend/validation/BenefitTransactionValidation");
const { NextResponse } = require("next/server");

/*
 * Connect to the database
 */
connect();

/*
 * POST /api/transaction/benefit/create
 * Create a a new benefit transaction
 */
async function POST(request) {
  try {
    const reqBody = await request.json();
    const isValid = await validateBenefitTransaction(reqBody);

    if (!isValid) {
      return NextResponse.json({ error: "Valores inválidos" }, { status: 400 });
    }

    const userId = getDataFromToken(request);
    reqBody.userId = userId;

    const newBenefitTransaction = new BenefitTransaction(reqBody);
    const savedBenefit = await newBenefitTransaction.save();
    return NextResponse.json({
      message: "Beneficio creado correctamente",
      data: savedBenefit,
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

module.exports = { POST };
