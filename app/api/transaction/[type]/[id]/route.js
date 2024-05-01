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
 * GET /api/transaction/[type]/[id]
 * Get the transaction by id
 */
async function GET(request, { params }) {
  try {
    const userId = getDataFromToken(request);
    const { type, id } = params;

    switch (type) {
      case "benefit":
        const benefit = await BenefitTransaction.findOne({ _id: id, userId });
        console.log(benefit);
        return NextResponse.json({
          data: benefit,
          success: true,
        });
      case "expense":
        const expense = await ExpenseTransaction.findOne({ _id: id, userId });
        return NextResponse.json({
          data: expense,
          success: true,
        });
      case "investment":
        const investment = await InvestmentTransaction.findOne({
          _id: id,
          userId,
        });
        return NextResponse.json({
          data: investment,
          success: true,
        });
      default:
        return NextResponse.json(
          {
            error:
              "La transacción que busca no existe. Por favor, inténtelo de nuevo.",
          },
          { status: 404 }
        );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Ha ocurrido un error. Por favor, inténtelo de nuevo." },
      { status: 500 }
    );
  }
}

/*
 * Update the transaction by id and type
 */
async function PUT(request, { params }) {
  try {
    const userId = getDataFromToken(request);
    const { type, id } = params;
    const body = await request.json();
    let transaction;
    console.log(body);

    switch (type) {
      case "benefit":
        body.type = "benefit";
        transaction = await BenefitTransaction.findOneAndUpdate(
          { _id: id, userId },
          body,
          { new: true }
        );
        break;
      case "expense":
        body.type = "expense";
        transaction = await ExpenseTransaction.findOneAndUpdate(
          { _id: id, userId },
          body,
          { new: true }
        );
        break;
      case "investment":
        body.type = "investment";
        transaction = await InvestmentTransaction.findOneAndUpdate(
          { _id: id, userId },
          body,
          { new: true }
        );
        break;
      default:
        return NextResponse.json(
          {
            error:
              "La transacción que busca no existe. Por favor, inténtelo de nuevo.",
          },
          { status: 404 }
        );
    }

    return NextResponse.json({
      data: transaction,
      message: "La transacción ha sido actualizada correctamente.",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Ha ocurrido un error. Por favor, inténtelo de nuevo." },
      { status: 500 }
    );
  }
}

module.exports = {
  GET,
  PUT,
};
