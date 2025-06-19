import handleAsyncError from "../middlewares/handleAsyncError";
import { sendToken } from "../utils/jwt";

export const registerUser = handleAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await UserActivation.create({
    name,
    email,
    password,
  });
  sendToken(user, 201, res);
});
