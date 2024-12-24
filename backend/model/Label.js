import mongoose from "mongoose";

const benefitTransactionSchema = new mongoose.Schema({
  labelType: {
    type: String,
    enum: ["MANDATORY", "UNNECESSARY", "INVESTMENT", "BENEFIT"],
    required: true,
  },
  title: {
    type: String,
    required: true,
  }
});

const BenefitTransaction =
  mongoose.models.benefitTransactions ||
  mongoose.model("benefitTransactions", benefitTransactionSchema);

export { BenefitTransaction };
