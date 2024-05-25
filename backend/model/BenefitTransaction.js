import mongoose from "mongoose";

const benefitTransactionSchema = new mongoose.Schema({
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

const BenefitTransaction =
  mongoose.models.benefitTransactions ||
  mongoose.model("benefitTransactions", benefitTransactionSchema);

export { BenefitTransaction };
