import Money from "../Money";

/**
 * The pricing result output of the basket pricer.
 */
export default interface PricingResult {

    /**
     * The undiscounted cost of items in a basket.
     */
    subtotal: Money

    /**
     * The amount of money discounted from the basket subtotal.
     */
    discount: Money

    /**
     * The final price of the basket including discounts.
     */
    total: Money
}