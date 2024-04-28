const Yup = require("yup");

const investmentTransactionSchema = Yup.object().shape({
  quantity: Yup.number()
    .required("Campo cantidad obligatorio")
    .min(1, "Debe de ser mayor a 0"),
  description: Yup.string()
    .required("Campo descripción obligatorio")
    .max(100, "Máximo 100 caracteres"),
  date: Yup.date()
    .required("Campo fecha obligatorio")
    .max(new Date(), "La fecha no puede ser futura"),
  investmentType: Yup.string()
    .required("Campo obligatorio")
    .oneOf(["BENEFIT", "INVESTMENT"], "Tipo de inversión inválido"),
});

export const validateInvestmentTransaction = async (reqBody) => {
  try {
    await investmentTransactionSchema.validate(reqBody, { abortEarly: true });
    return true;
  } catch (error) {
    return error.errors;
  }
};
