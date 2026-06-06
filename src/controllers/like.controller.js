import { likeService } from "../services/like.service.js";
import { responseSuccess } from "../common/helpers/response.helper.js";

export const likeController = {
  async likeRes(req, res, next) {
    const result = await likeService.likeRes(req);
    const response = responseSuccess(result, "Like thành công");
    res.status(response.statusCode).json(response);
  },

  async unlikeRes(req, res, next) {
    const result = await likeService.unlikeRes(req);
    const response = responseSuccess(result, `Unlike thành công`);
    res.status(response.statusCode).json(response);
  },

  async getLikebyRes(req, res, next) {
    const result = await likeService.getLikesByRes(req);
    const response = responseSuccess(
      result,
      `lấy danh sách like restaurant thành công`,
    );
    res.status(response.statusCode).json(response);
  },

  async getLikebyUser(req, res, next) {
    const result = await likeService.getLikesByUser(req);
    const response = responseSuccess(
      result,
      `lấy danh sách like user thành công`,
    );
    res.status(response.statusCode).json(response);
  },
};
