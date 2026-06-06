import { rateService } from "../services/rate.service.js";
import { responseSuccess } from "../common/helpers/response.helper.js";
export const rateController = {
  async addRate(req, res, next) {
    const result = await rateService.addRate(req);
    const response = responseSuccess(result, `Create rate successfully`);
    res.status(response.statusCode).json(response);
  },

  async getRateByRes(req, res, next) {
    const result = await rateService.getRateByRes(req);
    const response = responseSuccess(
      result,
      `Get all rates by res successfully`,
    );
    res.status(response.statusCode).json(response);
  },

  async getRateByUser(req, res, next) {
    const result = await rateService.getRateByUser(req);
    const response = responseSuccess(
      result,
      `Get all rates by user successfully`,
    );
    res.status(response.statusCode).json(response);
  },
};
