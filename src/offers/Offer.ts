import Money from "../Money";

/**
 * An offer that can be applied to a collection of items.
 */
export interface Offer {
    /**
     * Applies the offer to the given items.
     *
     * @param items the items
     */
    apply(items: Item[]): OfferResult
}

/**
 * The result of an offer.
 */
export interface OfferResult {

    /**
     * The items that the offer has been applied to.
     */
    appliedToItems: Item[]

    /**
     * The amount of money that has been discounted by the offer.
     */
    discountAmount: Money
}

/**
 * An item that an offer can apply to.
 */
export interface Item {

    /**
     * The name of the product that the item references.
     */
    name: string,

    /**
     * The price of the item.
     */
    price: Money
}
