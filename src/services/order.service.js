import { prisma } from "../common/prisma/connect.prisma.js";
import { BadrequestError } from "../common/helpers/exception.helper.js";
export const orderService = {
  async create(req) {
    const user_id = req.user.user_id;
    const { food_id, amount } = req.body;
    const food = await prisma.food.findUnique({
      where: {
        food_id: Number(food_id),
      },
    });

    if (!food) {
      throw new BadrequestError("Món ăn không tồn tại");
    }

    if (amount <= 0) {
      throw new BadrequestError("Số lượng phải lớn hơn 0");
    }

    const result = await prisma.order.create({
      data: {
        user_id: Number(user_id),
        food_id: Number(food_id),
        amount: Number(amount),
        code: `ORD-${Date.now()}`,
        arr_sub_id: "",
      },
    });

    return true;
  },
};
