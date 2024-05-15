import BasketLineItem from "./BasketLineItem";

/**
 * Represents a basket from the shopping basket system.
 */
export default interface Basket {
    /**
     * The collection of items in the basket.
     */
    items: BasketLineItem[]
}