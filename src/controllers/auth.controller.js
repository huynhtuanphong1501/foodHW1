import { authService } from "../services/auth.service.js";
import { responseSuccess } from "../common/helpers/response.helper.js";

const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax",
  secure: false,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

export const authController = {
  async login(req, res, next) {
    const { accessTolken, refreshToken } = await authService.login(req);
    res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
    res.cookie("accessToken", accessTolken, COOKIE_OPTIONS);
    const response = responseSuccess(
      { accessTolken },
      `User logged in successfully`,
    );
    res.json(response);
  },

  async register(req, res, next) {
    const result = await authService.register(req);
    const response = responseSuccess(result, `User registered successfully`);
    res.json(response);
  },

  async refreshToken(req, res, next) {
    const { accessToken, refreshToken } = await authService.refreshToken(req);
    res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
    res.cookie("accessToken", accessToken, COOKIE_OPTIONS);
    const response = responseSuccess(
      {
        accessToken,
        refreshToken,
      },
      `Refresh token successfully`,
    );
    res.status(response.statusCode).json(response);
  },
};
