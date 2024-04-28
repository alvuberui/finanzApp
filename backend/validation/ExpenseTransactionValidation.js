const Yup = require("yup");

const expenseTransactionSchema = Yup.object().shape({
  quantity: Yup.number()
    .required("Campo cantidad obligatorio")
    .min(1, "Debe de ser mayor a 0"),
  description: Yup.string()
    .required("Campo descripción obligatorio")
    .max(100, "Máximo 100 caracteres"),
  date: Yup.date()
    .required("Campo fecha obligatorio")
    .max(new Date(), "La fecha no puede ser futura"),
  expenseType: Yup.string()
    .required("Campo obligatorio")
    .oneOf(["MANDATORY", "UNNECESSARY"], "Tipo de gasto inválido"),
});

export const validateExpenseTransaction = async (reqBody) => {
  try {
    await expenseTransactionSchema.validate(reqBody, { abortEarly: true });
    return true;
  } catch (error) {
    return error.errors;
  }
};
