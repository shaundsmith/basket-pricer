import Money from "../Money";

/**
 * A product within the product catalogue.
 */
export default interface Product {

    /**
     * The name of the product.
     */
    name: string

    /**
     * The price of the product.
     */
    price: Money
}
