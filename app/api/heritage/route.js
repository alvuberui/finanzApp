const { connect } = require("@/backend/config/dbConfig");
const { getDataFromToken } = require("@/backend/helper/getDataFromToken");
const { BenefitTransaction } = require("@/backend/model/BenefitTransaction");
const { ExpenseTransaction } = require("@/backend/model/ExpenseTransaction");
const {
  InvestmentTransaction,
} = require("@/backend/model/InvestmentTransaction");
const { User } = require("@/backend/model/UserModel");
const { NextResponse } = require("next/server");

/*
 * Connect to the database
 */
connect();


/*
 * GET /api/heritage
 * Get the heritage of the user
 */
async function GET(request) {
    try {
    const userId = getDataFromToken(request);
  
    const benefits = await BenefitTransaction.find({ userId });
    const expenses = await ExpenseTransaction.find({ userId });
    const user = await User.findById(userId);
  
    const benefitsTotal = benefits.reduce((total, benefit) => total + benefit.quantity, 0);
    const expensesTotal = expenses.reduce((total, expense) => total + expense.quantity, 0);

    const heritage = user.currentMoney + benefitsTotal - expensesTotal;
    return NextResponse.json({
      data: heritage.toFixed(2),
      success: true,
    });
    } catch (error) {
        console.log(error);
      return NextResponse.json(
        { error: "Ha ocurrido un error. Por favor, inténtelo de nuevo" },
        { status: 500 }
      );
    }
  }
  
  module.exports = { GET };