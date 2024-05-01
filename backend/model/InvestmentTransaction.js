import mongoose from "mongoose";

const investmentTransactionSchema = new mongoose.Schema({
  investmentType: {
    type: String,
    enum: ["BENEFIT", "INVESTMENT"],
    required: true,
  },
  quantity: {
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
  type: {
    type: String,
    required: true,
  },
});

const InvestmentTransaction =
  mongoose.models.investmentTransactions ||
  mongoose.model("investmentTransactions", investmentTransactionSchema);

export { InvestmentTransaction };
