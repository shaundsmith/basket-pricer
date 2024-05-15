import BasketPricer, {Mode} from "../src/BasketPricer";
import ProductCatalogue from "../src/interfaces/ProductCatalogue";
import Money from "../src/Money";
import Basket from "../src/interfaces/Basket";
import BuyXGetYFreeOffer from "../src/offers/BuyXGetYFreeOffer";
import FixedPriceOffer from "../src/offers/FixedPriceOffer";
import PercentageOffer from "../src/offers/PercentageOffer";
import BuyXCheapestFreeOffer from "../src/offers/BuyXCheapestFreeOffer";

describe("BasketPricer specifications", () => {

    const productCatalogue: ProductCatalogue = {
        products: [
            {
                name: "Baked Beans",
                price: new Money(99)
            },
            {
                name: "Biscuits",
                price: new Money(120)
            },
            {
                name: "Sardines",
                price: new Money(189)
            },
            {
                name: "Shampoo (Small)",
                price: new Money(200)
            },
            {
                name: "Shampoo (Medium)",
                price: new Money(250)
            },
            {
                name: "Shampoo (Large)",
                price: new Money(350)
            }
        ]
    }

    it("returns a pricing result for an empty basket", () => {

        const sut = new BasketPricer(productCatalogue, [])

        const result = sut.calculatePrice({items: []})

        expect(result).toEqual({
            subtotal: new Money(0),
            total: new Money(0),
            discount: new Money(0)
        })
    });

    it("throws an error when products exist in the basket which are not in the catalogue", () => {

        const basket: Basket = {
            items: [
                {
                    name: "Potato Waffles",
                    quantity: 1
                }
            ]
        }
        const sut = new BasketPricer(productCatalogue, [])

        expect(() => sut.calculatePrice(basket)).toThrow("Item 'Potato Waffles' not found in price catalogue")
    });

    it("throws an error when products exist in the basket which are not in the catalogue", () => {

        const productCatalogue = {
            products: [
                {name: "Potato Waffles", price: new Money(199)},
                {name: "Potato Waffles", price: new Money(350)},
            ]
        }
        const basket: Basket = {
            items: [
                {
                    name: "Potato Waffles",
                    quantity: 1
                }
            ]
        }
        const sut = new BasketPricer(productCatalogue, [])

        expect(() => sut.calculatePrice(basket)).toThrow("Item 'Potato Waffles' found multiple times in price catalogue")
    });

    it("returns a pricing result when no offers are available", () => {

        const basket: Basket = {
            items: [
                {
                    name: "Baked Beans",
                    quantity: 1
                }
            ]
        }
        const sut = new BasketPricer(productCatalogue, [])

        const result = sut.calculatePrice(basket)

        expect(result).toEqual({
            subtotal: new Money(99),
            total: new Money(99),
            discount: new Money(0)
        })
    });

    it("returns a pricing result for a basket with a multi-buy offer", () => {

        const basket: Basket = {
            items: [
                {
                    name: "Baked Beans",
                    quantity: 2
                }
            ]
        }
        const sut = new BasketPricer(productCatalogue, [new BuyXGetYFreeOffer("Baked Beans", 1, 1)])

        const result = sut.calculatePrice(basket)

        expect(result).toEqual({
            subtotal: new Money(198),
            total: new Money(99),
            discount: new Money(99)
        })
    })

    it("returns the pricing result for a basket with a fixed price offer", () => {

        const basket: Basket = {
            items: [
                {
                    name: "Baked Beans",
                    quantity: 1
                }
            ]
        }
        const sut = new BasketPricer(productCatalogue, [new FixedPriceOffer("Baked Beans", new Money(50))])

        const result = sut.calculatePrice(basket)

        expect(result).toEqual({
            subtotal: new Money(99),
            total: new Money(49),
            discount: new Money(50)
        })
    })

    it("returns the pricing result for a basket with a percentage offer", () => {

        const basket: Basket = {
            items: [
                {
                    name: "Baked Beans",
                    quantity: 1
                }
            ]
        }
        const sut = new BasketPricer(productCatalogue, [new PercentageOffer("Baked Beans", 0.5)])

        const result = sut.calculatePrice(basket)

        expect(result).toEqual({
            subtotal: new Money(99),
            total: new Money(49),
            discount: new Money(50)
        })
    })

    it("applies discounts multiple times", () => {
        const basket: Basket = {
            items: [
                {
                    name: "Baked Beans",
                    quantity: 15
                }
            ]
        }
        const sut = new BasketPricer(productCatalogue, [
            new BuyXGetYFreeOffer("Baked Beans", 3, 1),
        ])

        const result = sut.calculatePrice(basket)

        expect(result).toEqual({
            subtotal: new Money(1485),
            total: new Money(1188),
            discount: new Money(297)
        })
    })

    it("applies multiple discounts to a basket - example 1", () => {
        const basket: Basket = {
            items: [
                {
                    name: "Baked Beans",
                    quantity: 4
                },
                {
                    name: "Biscuits",
                    quantity: 1
                }
            ]
        }
        const sut = new BasketPricer(productCatalogue, [
            new PercentageOffer("Sardines", 0.25),
            new BuyXGetYFreeOffer("Baked Beans", 2, 1),
        ])

        const result = sut.calculatePrice(basket)

        expect(result).toEqual({
            subtotal: new Money(516),
            total: new Money(417),
            discount: new Money(99)
        })
    })

    it("applies multiple discounts to a basket - example 2", () => {
        const basket: Basket = {
            items: [
                {
                    name: "Baked Beans",
                    quantity: 2
                },
                {
                    name: "Biscuits",
                    quantity: 1
                },
                {
                    name: "Sardines",
                    quantity: 2
                }
            ]
        }
        const sut = new BasketPricer(productCatalogue, [
            new PercentageOffer("Sardines", 0.25),
            new BuyXGetYFreeOffer("Baked Beans", 2, 1),
        ])

        const result = sut.calculatePrice(basket)

        expect(result).toEqual({
            subtotal: new Money(696),
            total: new Money(601),
            discount: new Money(95)
        })
    })

    it("applies multiple discounts to a basket - example 3", () => {
        const basket: Basket = {
            items: [
                {
                    name: "Shampoo (Large)",
                    quantity: 3
                },
                {
                    name: "Shampoo (Medium)",
                    quantity: 1
                },
                {
                    name: "Shampoo (Small)",
                    quantity: 2
                }
            ]
        }
        const sut = new BasketPricer(productCatalogue, [
            new BuyXCheapestFreeOffer(["Shampoo (Large)", "Shampoo (Medium)", "Shampoo (Small)"], 3)
        ])

        const result = sut.calculatePrice(basket)

        expect(result).toEqual({
            subtotal: new Money(1700),
            total: new Money(1150),
            discount: new Money(550)
        })
    })

    it("applies the best discounts in best discount mode", () => {

        const basket: Basket = {
            items: [
                {
                    name: "Shampoo (Large)",
                    quantity: 3
                }
            ]
        }
        const sut = new BasketPricer(productCatalogue, [
            new BuyXCheapestFreeOffer(["Shampoo (Large)", "Shampoo (Medium)", "Shampoo (Small)"], 3),
            new FixedPriceOffer("Shampoo (Large)", new Money(250))
        ], Mode.BEST_OFFER)

        const result = sut.calculatePrice(basket)

        expect(result).toEqual({
            subtotal: new Money(1050),
            total: new Money(300),
            discount: new Money(750)
        })
    })

    it("applies the discounts in order in ordered discount mode", () => {

        const basket: Basket = {
            items: [
                {
                    name: "Shampoo (Large)",
                    quantity: 3
                }
            ]
        }
        const sut = new BasketPricer(productCatalogue, [
            new BuyXCheapestFreeOffer(["Shampoo (Large)", "Shampoo (Medium)", "Shampoo (Small)"], 3),
            new FixedPriceOffer("Shampoo (Large)", new Money(250))
        ], Mode.ORDERED_OFFERS)

        const result = sut.calculatePrice(basket)

        expect(result).toEqual({
            subtotal: new Money(1050),
            total: new Money(700),
            discount: new Money(350)
        })
    })

})