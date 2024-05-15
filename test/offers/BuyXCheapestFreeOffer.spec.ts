import BuyXCheapestFreeOffer from "../../src/offers/BuyXCheapestFreeOffer";
import Money from "../../src/Money";


describe("BuyXCheapestFreeOffer specification", () => {

    const sut = new BuyXCheapestFreeOffer(["Cola", "Lemonade", "Orange Juice"], 3)

    it("discounts the full price of the cheapest item when the correct quantity of items has been purchased", () => {

        const result = sut.apply([
            {name: "Cola", price: new Money(400)},
            {name: "Lemonade", price: new Money(350)},
            {name: "Orange Juice", price: new Money(175)}
        ])

        expect(result).toEqual({
            appliedToItems: [
                {name: "Cola", price: new Money(400)},
                {name: "Lemonade", price: new Money(350)},
                {name: "Orange Juice", price: new Money(175)}
            ],
            discountAmount: new Money(175)
        })
    })

    it("provides the maximum discount when multiple item choices exist", () => {

        const result = sut.apply([
            {name: "Cola", price: new Money(400)},
            {name: "Lemonade", price: new Money(350)},
            {name: "Lemonade", price: new Money(350)},
            {name: "Orange Juice", price: new Money(175)}
        ])

        expect(result).toEqual({
            appliedToItems: [
                {name: "Cola", price: new Money(400)},
                {name: "Lemonade", price: new Money(350)},
                {name: "Lemonade", price: new Money(350)}
            ],
            discountAmount: new Money(350)
        })
    })

    it("does not apply the offer when the quantity of applicable items has not been provided", () => {

        const result = sut.apply([
            {name: "Cola", price: new Money(400)},
            {name: "Orange Juice", price: new Money(175)},
            {name: "Fish", price: new Money(550)},
            {name: "Pizza", price: new Money(499)}
        ])

        expect(result).toEqual({
            appliedToItems: [],
            discountAmount: new Money(0)
        })
    })

    it("does not apply the offer when no items have been provided", () => {

        const result = sut.apply([])

        expect(result).toEqual({
            appliedToItems: [],
            discountAmount: new Money(0)
        })
    })

    it("requires a minimum quantity of 2", () => {

        expect(() => new BuyXCheapestFreeOffer(["Chips"], 1)).toThrow()
        expect(() => new BuyXCheapestFreeOffer(["Chips"], 2)).not.toThrow()
    })

    it("requires at least one item to be provided", () => {

        expect(() => new BuyXCheapestFreeOffer([], 2)).toThrow()
        expect(() => new BuyXCheapestFreeOffer(["Chips"], 2)).not.toThrow()
    })


});