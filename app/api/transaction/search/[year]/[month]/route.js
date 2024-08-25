const { connect } = require("@/backend/config/dbConfig");
const { getDataFromToken } = require("@/backend/helper/getDataFromToken");
const { BenefitTransaction } = require("@/backend/model/BenefitTransaction");
const { ExpenseTransaction } = require("@/backend/model/ExpenseTransaction");
const {
  InvestmentTransaction,
} = require("@/backend/model/InvestmentTransaction");
const { NextResponse } = require("next/server");


/*
 * Connect to the database
 */
connect();

/*
 * Get all transactions by user, year and month
 * GET /api/transaction/:year/:month
 */
async function GET(request, { params }) {
  try {
    const userId = getDataFromToken(request);
    const { year, month } = params;
    
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    // Ajustamos la hora del endDate para asegurarnos de incluir todo el último día
    endDate.setHours(23, 59, 59, 999);

    const benefits = await BenefitTransaction.find({
      userId,
      date: { $gte: startDate, $lte: endDate },
    });
    const expenses = await ExpenseTransaction.find({
      userId,
      date: { $gte: startDate, $lte: endDate },
    });
    const investments = await InvestmentTransaction.find({
      userId,
      date: { $gte: startDate, $lte: endDate },
    });

    // Unimos los resultados en una sola lista y lo ordenamos por fecha
    benefits.push(...expenses, ...investments);
    benefits.sort((a, b) => b.date - a.date);

    return NextResponse.json({
      data: benefits,
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Error fetching transactions",
      success: false,
    });
  }
}

module.exports = {
  GET,
};