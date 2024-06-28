const Yup = require("yup");

const benefitTransactionSchema = Yup.object().shape({
  quantity: Yup.number()
    .required("Campo obligatorio")
    .min(1, "Debe de ser mayor a 0"),
  description: Yup.string()
    .required("Campo obligatorio")
    .max(100, "Máximo 100 caracteres"),
  date: Yup.date()
    .required("Campo obligatorio")
    .max(new Date(), "La fecha no puede ser futura"),
});

export const validateBenefitTransaction = async (reqBody) => {
  try {
    await benefitTransactionSchema.validate(reqBody, { abortEarly: true });
    return true;
  } catch (error) {
    return error.errors;
  }
};
