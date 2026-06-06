import { UnauthorizedError } from "../helpers/exception.helper.js";
import { verifyAccessToken } from "../helpers/jwt.helper.js";
import { prisma } from "../prisma/connect.prisma.js";
export const authCookie = async (req, res, next) => {
  const { accessToken } = req.cookies;
  if (!accessToken) throw new UnauthorizedError("không có token");
  const decode = verifyAccessToken(accessToken);
  const userExist = await prisma.user.findFirst({
    where: {
      user_id: decode.user_id,
    },
  });

  if (!userExist) {
    throw new UnauthorizedError("user not found");
  }

  req.user = userExist;
  next();
};
