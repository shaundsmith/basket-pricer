import {Money} from "../types/Money";

export default interface PricingResult {
    subtotal: Money
    discount: Money
    total: Money
}