import { get } from "@/api/client";

export default async (callback) => {
  try {
    const promo = await get("allPromotions", "api");
    console.log(promo);
    callback(promo);
    return promo;
  } catch (err) {
    callback(false);
    console.log(err);
    return false;
  }
};
