import { prisma } from "../common/prisma/connect.prisma.js";
import { BadrequestError } from "../common/helpers/exception.helper.js";
export const rateService = {
  async addRate(req) {
    const user_id = req.user.user_id;
    const { res_id, amount } = req.body;
    if (amount < 0 || amount > 10) {
      throw new BadrequestError("Điểm đánh giá phải từ 0 đến 10");
    }
    const exist = await prisma.restaurant.findUnique({
      where: {
        res_id: res_id,
      },
    });
    if (!exist) {
      throw new BadrequestError("res not found");
    }
    const res = await prisma.rate_res.create({
      data: {
        user_id: Number(user_id),
        res_id: Number(res_id),
        amount: Number(amount),
        date_rate: new Date(),
      },
    });
    return true;
  },

  async getRateByRes(req) {
    const { resId } = req.params;
    const res_id = Number(resId);
    const list = await prisma.rate_res.findMany({
      where: {
        res_id: res_id,
      },
      include: {
        user: true,
      },
    });
    return list;
  },

  async getRateByUser(req) {
    const { userId } = req.params;
    const user_id = Number(userId);
    const list = await prisma.rate_res.findMany({
      where: {
        user_id: user_id,
      },
      include: {
        restaurant: true,
      },
    });
    return list;
  },
};
