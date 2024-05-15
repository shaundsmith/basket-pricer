import BuyXCheapestFreeOffer from "../src/offers/BuyXCheapestFreeOffer";
import BuyXGetYFreeOffer from "../src/offers/BuyXGetYFreeOffer";
import PercentageOffer from "../src/offers/PercentageOffer";
import FixedPriceOffer from "../src/offers/FixedPriceOffer";
import Money from "../src/Money";

export default [
    new BuyXCheapestFreeOffer(["Shampoo (Large)", "Shampoo (Medium)", "Shampoo (Small)"], 3),
    new BuyXGetYFreeOffer("Baked Beans", 2, 1),
    new PercentageOffer("Sardines", 0.25),
    new FixedPriceOffer("Biscuits", new Money(50))
]