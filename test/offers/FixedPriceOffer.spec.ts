import FixedPriceOffer from "../../src/offers/FixedPriceOffer";
import Money from "../../src/Money";

describe("FixedPriceOffer specification", () => {

    const sut = new FixedPriceOffer("Baked Beans", new Money(200))

    it("discounts a product by the fixed price", () => {

        const result = sut.apply([{name: "Baked Beans", price: new Money(299)}])

        expect(result).toEqual({
            appliedToItems: [{name: "Baked Beans", price: new Money(299)}],
            discountAmount: new Money(200)
        })
    })

    it("returns a discount of zero if the product price is less than the discount", () => {

        const result = sut.apply([{name: "Baked Beans", price: new Money(99)}])

        expect(result).toEqual({
            appliedToItems: [{name: "Baked Beans", price: new Money(99)}],
            discountAmount: new Money(99)
        })
    })

    it("discounts multiple products by the fixed price", () => {

        const result = sut.apply([
            {name: "Baked Beans", price: new Money(299)},
            {name: "Baked Beans", price: new Money(299)}
        ])

        expect(result).toEqual({
            appliedToItems: [
                {name: "Baked Beans", price: new Money(299)},
                {name: "Baked Beans", price: new Money(299)}
            ],
            discountAmount: new Money(400)
        })
    })

    it("does not discount items that do not match the discount item name", () => {

        const result = sut.apply([
            {name: "Baked Beans", price: new Money(299)},
            {name: "Fish", price: new Money(599)}
        ])

        expect(result).toEqual({
            appliedToItems: [
                {name: "Baked Beans", price: new Money(299)}
            ],
            discountAmount: new Money(200)
        })
    })

    it("returns no discount if no items match the discount name", () => {

        const result = sut.apply([
            {name: "Chips", price: new Money(299)},
            {name: "Fish", price: new Money(599)}
        ])

        expect(result).toEqual({
            appliedToItems: [],
            discountAmount: new Money(0)
        })
    })

    it("requires a discount amount", () => {

        expect(() => new FixedPriceOffer("Baked Beans", null)).toThrow()
    })

    it("requires a product name", () => {

        expect(() => new FixedPriceOffer(null, new Money(100))).toThrow()
    })


});