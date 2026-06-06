import { prisma } from "../common/prisma/connect.prisma.js";
import { BadrequestError } from "../common/helpers/exception.helper.js";
import bcrypt from "bcrypt";
import {
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "../common/helpers/jwt.helper.js";

export const authService = {
  async login(req) {
    const { email, password } = req.body;
    // console.log({ email, password });
    const userExists = await prisma.user.findFirst({
      where: {
        email: email,
      },
      omit: {
        password: false,
      },
    });
    if (!userExists) {
      throw new BadrequestError("Email does not exist");
    }
    const comparePassword = bcrypt.compareSync(password, userExists.password);
    if (!comparePassword) {
      throw new BadrequestError("Password is incorrect");
    }

    // console.log(userExists.user_id);
    const payload = {
      user_id: userExists.user_id,
      email: userExists.email,
    };
    const accessTolken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);
    // console.log({ accessTolken, refreshToken });
    return { accessTolken, refreshToken };
  },

  async register(req) {
    const { full_name, email, password } = req.body;
    // console.log({ full_name, email, password });
    const userExists = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (userExists) {
      throw new BadrequestError("Email already exists");
    }
    const hashPassword = bcrypt.hashSync(password, 10);
    const newUser = await prisma.user.create({
      data: {
        full_name: full_name,
        email: email,
        password: hashPassword,
      },
    });
    return true;
  },

  async refreshToken(req) {
    const { refreshToken, accessToken } = req.cookies;
    // console.log({ refreshToken, accessToken });
    if (!refreshToken) {
      throw new BadrequestError("Refresh token is required");
    }
    if (!accessToken) {
      throw new BadrequestError("Access token is required");
    }
    const decodeAccessToken = verifyAccessToken(accessToken, {
      ignoreExpiration: true,
    });
    const decodeRefreshToken = verifyRefreshToken(refreshToken);
    if (decodeAccessToken.user_id !== decodeRefreshToken.user_id) {
      throw new BadrequestError("invalid token");
    }
    const userExist = await prisma.user.findUnique({
      where: {
        user_id: decodeAccessToken.user_id,
      },
    });
    // console.log(decodeAccessToken);
    if (!userExist) {
      throw new BadrequestError("user not found");
    }
    const payload = {
      user_id: userExist.user_id,
      email: userExist.email,
    };

    const newAccessToken = signAccessToken(payload);

    return {
      accessToken: newAccessToken,
      refreshToken: refreshToken,
    };
  },
};
