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
 * Get all transactions by user and year
 * GET /api/transaction/:year
 */
async function GET(request, { params }) {
  try {
    const userId = getDataFromToken(request);
    const { year } = params;
    
    // Definimos el rango de fechas
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31, 23, 59, 59);

    const benefits = await BenefitTransaction.find({
      userId,
      date: { $gte: startDate, $lt: endDate },
    });
    const expenses = await ExpenseTransaction.find({
      userId,
      date: { $gte: startDate, $lt: endDate },
    });
    const investments = await InvestmentTransaction.find({
      userId,
      date: { $gte: startDate, $lt: endDate },
    });
    
    // Unimos los resultados en una sola lista y lo ordenamos por fecha
    benefits.push(...expenses, ...investments);
    benefits.sort((a, b) => a.date - b.date);

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