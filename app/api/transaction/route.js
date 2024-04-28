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
 * Get all types of transactions from the user ordenador por año, mes y día.
 * { "2024": { "1": [ objetc1, oobject2 ], "2": [object1] }, "2025": { "1": [ objetc1, oobject2 ], "2": [object1] } }
 */
async function GET(request) {
  try {
    const userId = getDataFromToken(request);
    const benefits = await BenefitTransaction.find({ userId });
    const expenses = await ExpenseTransaction.find({ userId });
    const investments = await InvestmentTransaction.find({ userId });

    // Convertimos todos los objetos en un solo objeto de tipo { "_id", "type", "quantity", "subtype", "date", "description"}
    const transactions = [...benefits, ...expenses, ...investments];
    const transactionsByYear = {};

    transactions.forEach((transaction) => {
      const year = transaction.date.getFullYear();
      const month = transaction.date.getMonth() + 1;

      if (!transactionsByYear[year]) {
        transactionsByYear[year] = {};
      }

      const paddedMonth = month.toString().padStart(2, "0");
      if (!transactionsByYear[year][paddedMonth]) {
        transactionsByYear[year][paddedMonth] = [];
      }

      transactionsByYear[year][paddedMonth].push(transaction);
    });

    // Ordenar transacciones por fecha en cada mes
    for (const year in transactionsByYear) {
      for (const month in transactionsByYear[year]) {
        transactionsByYear[year][month].sort((a, b) => a.date - b.date);
      }
    }

    return NextResponse.json({
      data: transactionsByYear,
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Ha ocurrido un error. Por favor, inténtelo de nuevo" },
      { status: 400 }
    );
  }
}

module.exports = { GET };
