import {Item, Offer, OfferResult} from "./Offer";
import Money from "../Money";


export default class BuyXGetYFreeOffer implements Offer {

    readonly productName: string
    readonly quantityFree: number
    readonly quantityTotal: number

    /**
     * @param productName the name of the product that the offer applies to
     * @param quantityRequired the number of items required to invoke the offer
     * @param quantityFree the number of free items provided by the offer
     */
    constructor(productName: string, quantityRequired: number, quantityFree: number) {
        if (!productName) {
            throw Error("No product name provided")
        }
        if (quantityRequired < 1) {
            throw Error("Quantity required must be at least 1")
        }
        if (quantityFree < 1) {
            throw Error("Quantity free must be at least 1")
        }
        this.productName = productName
        this.quantityFree = quantityFree
        this.quantityTotal = quantityRequired + quantityFree
    }

    apply(items: Item[]): OfferResult {

        const applicableItems = items
            .filter(item => item.name === this.productName)
            .slice(0, this.quantityTotal)
        const discount = this.#calculateDiscount(applicableItems)

        return {
            appliedToItems: applicableItems.length === this.quantityTotal ? applicableItems : [],
            discountAmount: discount
        };
    }

    #calculateDiscount(applicableItems: Item[]): Money {

        if (applicableItems.length !== this.quantityTotal) {
            return new Money(0)
        }

        return applicableItems[0].price.multiply(this.quantityFree)
    }

}