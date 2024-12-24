import mongoose from "mongoose";

const investmentTransactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  labelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Label",
    required: false,
  }
});

const InvestmentTransaction =
  mongoose.models.investmentTransactions ||
  mongoose.model("investmentTransactions", investmentTransactionSchema);

export { InvestmentTransaction };
