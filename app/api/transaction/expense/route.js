const { connect } = require("@/backend/config/dbConfig");
const { getDataFromToken } = require("@/backend/helper/getDataFromToken");

const { ExpenseTransaction } = require("@/backend/model/ExpenseTransaction");
const {
  validateExpenseTransaction,
} = require("@/backend/validation/ExpenseTransactionValidation");
const { NextResponse } = require("next/server");

/*
 * Connect to the database
 */
connect();

/*
 * POST /api/transaction/expense/create
 * Create a a new expense transaction
 */
async function POST(request) {
  try {
    const reqBody = await request.json();
    const isValid = await validateExpenseTransaction(reqBody);

    if (!isValid) {
      return NextResponse.json({ error: "Valores inválidos" }, { status: 400 });
    }

    const userId = getDataFromToken(request);
    reqBody.userId = userId;

    const newExpenseTransaction = new ExpenseTransaction(reqBody);
    const savedExpense = await newExpenseTransaction.save();
    return NextResponse.json({
      message: "Gasto creado correctamente",
      data: savedExpense,
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

module.exports = { POST };
