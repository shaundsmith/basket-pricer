import {Item, Offer, OfferResult} from "./Offer";
import Money from "../Money";

/**
 * An offer which applies a percentage discount to items with the specified product name.
 *
 * The percentage discount cannot be greater than 100%.
 */
export default class PercentageOffer implements Offer {

    readonly productName: string
    readonly percentage: number

    /**
     * @param productName the name of the product that the offer applies to
     * @param percentage the percentage discount, as a decimal
     */
    constructor(productName: string, percentage: number) {
        if (!productName) {
            throw Error("No product name provided")
        }
        if (percentage > 1 || percentage <= 0) {
            throw Error(`Invalid percentage provided '${percentage}'`)
        }

        this.productName = productName;
        this.percentage = percentage;
    }

    apply(items: Item[]): OfferResult {

        const applicableItems = items.filter(item => item.name === this.productName)
        const discount = this.#calculateDiscount(applicableItems)

        return {
            appliedToItems: applicableItems,
            discountAmount: discount
        };
    }

    #calculateDiscount(applicableItems: Item[]): Money {

        if (applicableItems.length === 0) {
            return new Money(0)
        }

        const itemPrice = applicableItems[0].price
        return itemPrice
            .multiply(this.percentage * applicableItems.length)
    }

}