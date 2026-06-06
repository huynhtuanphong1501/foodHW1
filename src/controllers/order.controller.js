import { orderService } from "../services/order.service.js";
import { responseSuccess } from "../common/helpers/response.helper.js";
export const orderController = {
  async create(req, res, next) {
    const result = await orderService.create(req);
    const response = responseSuccess(result, `Create order successfully`);
    res.status(response.statusCode).json(response);
  },
};
