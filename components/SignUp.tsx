import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { mutate } from "swr";

import {
  RegistrationFormData,
  registrationFormSchema,
} from "../types/form.types";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: yupResolver(registrationFormSchema),
  });

  const handleRegistration = handleSubmit((data) => {
    mutate(
      "registration",
      async () =>
        await fetch("/api/signup/", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        })
    );
  });

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        Leave a Replay
      </h3>
      <form onSubmit={handleRegistration}>
        <div className="grid grid-cols-1 gap-4 mb-4">
          <input
            type="text"
            {...register("email")}
            placeholder="Email address"
            className="w-full rounded-lg border-gray-200 text-gray-700 p-4 outline-none focus:ring-2 focus:ring-gray-200 bg-gray-100"
          />
          {errors["email"] ? (
            <span role="alert" className="text-red-500 font-bold text-sm">
              {errors["email"].message}
            </span>
          ) : null}
        </div>
        <div className="grid grid-cols-1 gap-4 mb-4">
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className="w-full rounded-lg border-gray-200 text-gray-700 p-4 outline-none focus:ring-2 focus:ring-gray-200 bg-gray-100"
          />
          {errors["password"] ? (
            <span role="alert" className="text-red-500 font-bold text-sm">
              {errors["password"].message}
            </span>
          ) : null}
        </div>
        <div className="mt-8">
          <button
            type="submit"
            className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
