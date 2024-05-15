import {Item, Offer, OfferResult} from "./Offer";
import Money from "../Money";

/**
 * An offer which applies a fixed price discount to items with the specified product name.
 *
 * The discount cannot be greater than the item price.
 */
export default class FixedPriceOffer implements Offer {

    readonly productName: string
    readonly discountAmount: Money

    /**
     * @param productName the name of the product that the offer applies to
     * @param discountAmount the amount of discount to be applied
     */
    constructor(productName: string, discountAmount: Money) {
        if (!productName) {
            throw Error("No product name provided")
        }
        if (!discountAmount) {
            throw Error("No discount amount provided")
        }
        this.productName = productName;
        this.discountAmount = discountAmount;
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
        return this.#moneyMin(this.discountAmount, itemPrice).multiply(applicableItems.length)
    }

    #moneyMin(a: Money, b: Money): Money {

        return a.amount > b.amount ? b : a
    }

}