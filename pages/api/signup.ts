import { NextApiHandler } from "next";
import { hash } from "bcrypt";

import { RegistrationFormData } from "../../types/form.types";
import { createAccount } from "../../services/createAccount";

const SALT_ROUNDS = 12;

const SignUpHandler: NextApiHandler = async (req, res) => {
  const body = req.body as RegistrationFormData;

  const passwordHash = await hash(body.password, SALT_ROUNDS);

  try {
    const user = await createAccount({
      email: body.email,
      password: passwordHash,
    });

    return res.json({ userId: user?.id });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
export default SignUpHandler;
