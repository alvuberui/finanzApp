import mongoose from "mongoose";

const expenseTransactionSchema = new mongoose.Schema({
  expenseType: {
    type: String,
    enum: ["MANDATORY", "UNNECESSARY"],
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

const ExpenseTransaction =
  mongoose.models.expenseTransactions ||
  mongoose.model("expenseTransactions", expenseTransactionSchema);

export { ExpenseTransaction };
