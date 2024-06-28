const { connect } = require("@/backend/config/dbConfig");
const { getDataFromToken } = require("@/backend/helper/getDataFromToken");
const { BenefitTransaction } = require("@/backend/model/BenefitTransaction");
const { ExpenseTransaction } = require("@/backend/model/ExpenseTransaction");
const {
  InvestmentTransaction,
} = require("@/backend/model/InvestmentTransaction");
const {
  validateBenefitTransaction,
} = require("@/backend/validation/BenefitTransactionValidation");
const { NextResponse } = require("next/server");

/*
 * Connect to the database
 */
connect();

/*
 * GET /api/transaction
 * Get all transactions by user { year: transactionList[], year : transactionList[] }
 */
async function GET(request) {
  try {
  const userId = getDataFromToken(request);

  const benefits = await BenefitTransaction.find({ userId });
  const expenses = await ExpenseTransaction.find({ userId });
  const investments = await InvestmentTransaction.find({ userId });

  const transactions = {
    benefits,
    expenses,
    investments,
  };

  // Crear un objeto donde los años son las claves y los valores son las transacciones de ese año
  const transactionsByYear = {};
  for (const transactionType in transactions) {
    transactions[transactionType].forEach((transaction) => {
      const year = transaction.date.getFullYear();
      if (!transactionsByYear[year]) {
        transactionsByYear[year] = [];
      }
      transactionsByYear[year].push(transaction);
    });
  }

  return NextResponse.json({
    data: transactionsByYear,
    success: true,
  });
  } catch (error) {
    return NextResponse.json(
      { error: "Ha ocurrido un error. Por favor, inténtelo de nuevo" },
      { status: 500 }
    );
  }
}

module.exports = { GET };
