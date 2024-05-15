import ProductCatalogue from "./interfaces/ProductCatalogue";
import Basket from "./interfaces/Basket";
import PricingResult from "./interfaces/PricingResult";
import {Item, Offer, OfferResult} from "./offers/Offer";
import BasketLineItem from "./interfaces/BasketLineItem";
import Product from "./interfaces/Product";
import Money from "./Money";
import removeFromArray from "./remove-from-array";

export enum Mode {
    ORDERED_OFFERS,
    BEST_OFFER
}

export default class BasketPricer {

    readonly productCatalogue: ProductCatalogue
    readonly offers: Offer[]
    readonly mode: Mode

    /**
     * @param productCatalogue the product catalogue
     * @param [offers] the offers available at the moment
     * @param [mode] the mode that the basket pricer runs in
     */
    constructor(productCatalogue: ProductCatalogue, offers: Offer[] = [], mode: Mode = Mode.ORDERED_OFFERS) {
        if (!productCatalogue) {
            throw Error("No product catalogue provided")
        }
        this.productCatalogue = productCatalogue
        this.offers = offers || []
        this.mode = mode
    }

    /**
     * Calculates the price of a given basket, including the subtotal, any discounts, and the final total.
     *
     * @param basket the basket to apply the discount to
     */
    calculatePrice(basket: Basket): PricingResult {

        if (basket.items.length === 0) {
            return {
                total: new Money(0),
                subtotal: new Money(0),
                discount: new Money(0),
            }
        }

        const items = this.#convertBasketItemsToOfferItems(basket.items)
        const subtotal = this.#calculateBasketSubtotal(items)
        const discount = this.#applyOffers(items)

        return {
            total: subtotal.minus(discount),
            subtotal: subtotal,
            discount: discount
        }
    }

    #applyOffers(items: Item[]): Money {
        return this.mode === Mode.BEST_OFFER ? this.#applyBestOffers(items) : this.#applyOrderedOffers(items)
    }

    #applyOrderedOffers(items: Item[]): Money {
        let discount = new Money(0)

        for (const offer of this.offers) {
            let result: OfferResult
            do {
                result = offer.apply(items)
                result.appliedToItems.forEach(item => removeFromArray(items, item))
                discount = discount.add(result.discountAmount)
            } while (result.appliedToItems.length > 0)
        }

        return discount
    }

    #applyBestOffers(items: Item[]): Money {
        let discount = new Money(0)

        let bestOffer: OfferResult;
        do {
            const offers = this.offers.map(offer => offer.apply(items))
                .filter(offerResult => offerResult.appliedToItems.length > 0)

            bestOffer = offers.length ?
                offers.reduce((a, b) => this.#calculateOfferValue(a) >  this.#calculateOfferValue(b) ? a : b) :
                null
            if (bestOffer) {
                bestOffer.appliedToItems.forEach(item => removeFromArray(items, item))
                discount = discount.add(bestOffer.discountAmount)
            }
        } while (bestOffer?.appliedToItems.length)

        return discount
    }

    #calculateOfferValue(result: OfferResult): number {
        return result.discountAmount.amount / result.appliedToItems.length
    }

    #calculateBasketSubtotal(items: Item[]): Money {

        return items.reduce((accumulator, item) =>
            accumulator.add(item.price), new Money(0))
    }

    #convertBasketItemsToOfferItems(basketItems: BasketLineItem[]): Item[] {

        return basketItems.flatMap(this.#convertBasketItemToOfferItems, this)
    }

    #convertBasketItemToOfferItems(basketItem: BasketLineItem): Item[] {

        const items: Item[] = []
        const product = this.#findItemInProductCatalogue(basketItem.name)
        for (let i = 0; i < basketItem.quantity; i++) {
            items.push({
                name: basketItem.name,
                price: product.price
            })
        }
        return items
    }

    #findItemInProductCatalogue(name: string): Product {

        const products = this.productCatalogue.products.filter(product => product.name === name);

        if (products.length === 0) {
            throw Error(`Item '${name}' not found in price catalogue`)
        } else if (products.length > 1) {
            throw Error(`Item '${name}' found multiple times in price catalogue`)
        }

        return products[0]
    }
}