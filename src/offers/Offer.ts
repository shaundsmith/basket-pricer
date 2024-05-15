import Money from "../Money";

export interface Offer {
    apply(items: Item[]): OfferResult
}

export interface OfferResult {
    appliedToItems: Item[]
    discountAmount: Money
}

export interface Item {
    name: string,
    price: Money
}
