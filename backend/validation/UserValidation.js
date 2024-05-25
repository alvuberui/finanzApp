/*
 * Function to validate the user input
 */

const Yup = require("yup");

const userSchema = Yup.object().shape({
  name: Yup.string()
    .required("Campo obligatorio")
    .max(50, "Máximo 50 caracteres"),
  firstName: Yup.string()
    .required("Campo obligatorio")
    .max(50, "Máximo 50 caracteres"),
  lastName: Yup.string()
    .required("Campo obligatorio")
    .max(50, "Máximo 50 caracteres"),
  birthDate: Yup.date()
    .max(
      new Date(
        new Date().getFullYear() - 12,
        new Date().getMonth(),
        new Date().getDate()
      ),
      "Debes de tener al menos 12 años"
    )
    .required("Campo obligatorio"),
  currentMoney: Yup.number()
    .required("Campo obligatorio")
    .min(0, "No puede ser negativo"),
  email: Yup.string()
    .email("Email inválido")
    .required("Campo obligatorio")
    .max(500, "Máximo 500 caracteres"),
  password: Yup.string()
    .min(6, "Debe de contener al menos 6 caracteres")
    .required("Campo obligatorio")
    .max(50, "Máximo 50 caracteres"),
});

const updateUserSchema = Yup.object().shape({
  name: Yup.string()
    .required("Campo obligatorio")
    .max(50, "Máximo 50 caracteres"),
  firstName: Yup.string()
    .required("Campo obligatorio")
    .max(50, "Máximo 50 caracteres"),
  lastName: Yup.string()
    .required("Campo obligatorio")
    .max(50, "Máximo 50 caracteres"),
  birthDate: Yup.date()
    .max(
      new Date(
        new Date().getFullYear() - 12,
        new Date().getMonth(),
        new Date().getDate()
      ),
      "Debes de tener al menos 12 años"
    )
    .required("Campo obligatorio"),
  currentMoney: Yup.number()
    .required("Campo obligatorio")
    .min(0, "No puede ser negativo"),
  email: Yup.string()
    .email("Email inválido")
    .required("Campo obligatorio")
    .max(500, "Máximo 500 caracteres"),
});

export const validateUser = async (reqBody) => {
  try {
    await userSchema.validate(reqBody, { abortEarly: true });
    return true;
  } catch (error) {
    return error.errors;
  }
};

export const validateUpdateUser = async (reqBody) => {
  try {
    await updateUserSchema.validate(reqBody, { abortEarly: true });
    return true;
  } catch (error) {
    return error.errors;
  }
};
