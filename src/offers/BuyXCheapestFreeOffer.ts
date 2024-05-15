import {Item, Offer, OfferResult} from "./Offer";
import Money from "../Money";

/**
 * An offer which discounts the full price of the cheapest item from a set of applicable products when a given number
 * of items are provided.
 */
export default class BuyXCheapestFreeOffer implements Offer {

    readonly productNames: string[]
    readonly quantityRequired: number

    /**
     * @param productNames the names of any products included in the offer
     * @param quantityRequired the number of items required for the offer. This does not include the free item.
     */
    constructor(productNames: string[], quantityRequired: number) {
        if (productNames.length === 0) {
            throw Error("At least one product name must be provided")
        }
        if (quantityRequired < 2) {
            throw Error("The minimum quantity for this offer to be applicable is 2")
        }
        this.productNames = productNames;
        this.quantityRequired = quantityRequired;
    }

    apply(items: Item[]): OfferResult {

        const applicableItems = items
            .filter(item => this.productNames.indexOf(item.name) >= 0)
            .sort(this.#comparePriceLargestFirst)
            .slice(0, this.quantityRequired)
        const discount = this.#calculateDiscount(applicableItems)

        return {
            appliedToItems: applicableItems.length === this.quantityRequired ? applicableItems : [],
            discountAmount: discount
        };
    }

    #calculateDiscount(applicableItems: Item[]): Money {

        if (applicableItems.length !== this.quantityRequired) {
            return new Money(0)
        }

        return applicableItems.slice(-1)[0].price
    }

    #comparePriceLargestFirst(a: Item, b: Item): number {

        return b.price.amount - a.price.amount
    }

}