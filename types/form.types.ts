import * as yup from "yup";

export const registrationFormSchema = yup
  .object({
    email: yup.string().email().required("Can not be empty"),
    password: yup.string().required("Can not be empty"),
  })
  .required();

export type RegistrationFormData = yup.InferType<typeof registrationFormSchema>;
