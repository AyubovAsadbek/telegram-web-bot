import { Course } from "../types/types";

export const totalPrice = (arr: Course[]) => {
  return arr.reduce((a, c) => a + c.price * (c.quantity ?? 0), 0);
};
