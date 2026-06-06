import { prisma } from "../common/prisma/connect.prisma.js";
import { BadrequestError } from "../common/helpers/exception.helper.js";

export const likeService = {
  async likeRes(req) {
    const user_id = req.user.user_id;
    const { res_id } = req.body;
    // console.log({ user_id, res_id });
    const likeExist = await prisma.like_rate.findFirst({
      where: {
        user_id: user_id,
        res_id: res_id,
      },
    });
    if (likeExist) {
      throw new BadrequestError("đã like nhà hàng này rồi");
    }
    const like = await prisma.like_rate.create({
      data: {
        user_id: Number(user_id),
        res_id: Number(res_id),
        date_like: new Date(),
      },
    });
    return true;
  },

  async unlikeRes(req) {
    const user_id = req.user.user_id;
    const { resId } = req.params;
    const res_id = Number(resId);
    const likeExist = await prisma.like_rate.findFirst({
      where: {
        user_id: user_id,
        res_id: Number(resId),
      },
    });

    if (!likeExist) {
      throw new BadrequestError("Like không tồn tại");
    }

    const res = await prisma.like_rate.delete({
      where: {
        like_rate_id: likeExist.like_rate_id,
      },
    });
    return true;
  },

  async getLikesByRes(req) {
    const { resId } = req.params;
    const res_id = Number(resId);
    const list = await prisma.like_rate.findMany({
      where: {
        res_id: res_id,
      },
      include: {
        user: true,
      },
    });
    return list;
  },

  async getLikesByUser(req) {
    const { userId } = req.params;
    const user_id = Number(userId);
    const list = await prisma.like_rate.findMany({
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
