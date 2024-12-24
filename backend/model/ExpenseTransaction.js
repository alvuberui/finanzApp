import mongoose from "mongoose";

const expenseTransactionSchema = new mongoose.Schema({
  expenseType: {
    type: String,
    enum: ["MANDATORY", "UNNECESSARY"],
    required: true,
  },
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

const ExpenseTransaction =
  mongoose.models.expenseTransactions ||
  mongoose.model("expenseTransactions", expenseTransactionSchema);

export { ExpenseTransaction };
