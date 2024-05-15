import BuyXGetYFreeOffer from "../../src/offers/BuyXGetYFreeOffer";
import Money from "../../src/Money";


describe("BuyXGetYFreeOffer specifications", () => {

    const sut = new BuyXGetYFreeOffer("Baked Beans", 3, 2)

    it("discounts the full price of the free quantity of items", () => {

        const result = sut.apply([
            {name: "Baked Beans", price: new Money(199)},
            {name: "Baked Beans", price: new Money(199)},
            {name: "Baked Beans", price: new Money(199)},
            {name: "Baked Beans", price: new Money(199)},
            {name: "Baked Beans", price: new Money(199)}
        ])

        expect(result).toEqual({
            appliedToItems: [
                {name: "Baked Beans", price: new Money(199)},
                {name: "Baked Beans", price: new Money(199)},
                {name: "Baked Beans", price: new Money(199)},
                {name: "Baked Beans", price: new Money(199)},
                {name: "Baked Beans", price: new Money(199)}
            ],
            discountAmount: new Money(398)
        })
    })

    it("requires the required quantity and the free quantity of the items in the basket to apply the discount", () => {
        const result = sut.apply([
            {name: "Baked Beans", price: new Money(199)},
            {name: "Baked Beans", price: new Money(199)},
            {name: "Baked Beans", price: new Money(199)},
            {name: "Baked Beans", price: new Money(199)}
        ])

        expect(result).toEqual({
            appliedToItems: [],
            discountAmount: new Money(0)
        })
    })

    it("discounts the full price of the free quantity of items when there are more items in the basket", () => {

        const result = sut.apply([
            {name: "Baked Beans", price: new Money(199)},
            {name: "Baked Beans", price: new Money(199)},
            {name: "Baked Beans", price: new Money(199)},
            {name: "Baked Beans", price: new Money(199)},
            {name: "Baked Beans", price: new Money(199)},
            {name: "Baked Beans", price: new Money(199)},
            {name: "Baked Beans", price: new Money(199)},
        ])

        expect(result).toEqual({
            appliedToItems: [
                {name: "Baked Beans", price: new Money(199)},
                {name: "Baked Beans", price: new Money(199)},
                {name: "Baked Beans", price: new Money(199)},
                {name: "Baked Beans", price: new Money(199)},
                {name: "Baked Beans", price: new Money(199)}
            ],
            discountAmount: new Money(398)
        })
    })

    it("only applies the discount for the specified product", () => {

        const result = sut.apply([
            {name: "Baked Beans", price: new Money(199)},
            {name: "Baked Beans", price: new Money(199)},
            {name: "Bread", price: new Money(89)},
            {name: "Bread", price: new Money(89)},
            {name: "Bread", price: new Money(89)},
            {name: "Bread", price: new Money(89)},
            {name: "Bread", price: new Money(89)},
        ])

        expect(result).toEqual({
            appliedToItems: [],
            discountAmount: new Money(0)
        })
    })

    it("requires a product name", () => {

        expect(() => new BuyXGetYFreeOffer(null, 2, 2)).toThrow()
    })

    it("requires the quantity required to be at least 1", () => {

        expect(() => new BuyXGetYFreeOffer("Chips", 0, 2)).toThrow()
        expect(() => new BuyXGetYFreeOffer("Chips", 1, 2)).not.toThrow()
    })

    it("requires the quantity free to be at least 1", () => {

        expect(() => new BuyXGetYFreeOffer("Chips", 1, 0)).toThrow()
        expect(() => new BuyXGetYFreeOffer("Chips", 1, 1)).not.toThrow()
    })


})