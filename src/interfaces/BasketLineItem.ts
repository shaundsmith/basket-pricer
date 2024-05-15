/**
 * Represents a line item within a basket.
 */
export default interface BasketLineItem {

    /**
     * The product name of the item in the basket
     */
    name: string

    /**
     * The quantity of the product within the basket
     */
    quantity: number
}