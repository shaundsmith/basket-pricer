import Money from "../../src/Money";
import PercentageOffer from "../../src/offers/PercentageOffer";

describe("PercentageOffer specification", () => {


    it("discounts a product by the percentage", () => {
        const sut = new PercentageOffer("Baked Beans", 0.5)

        const result = sut.apply([{name: "Baked Beans", price: new Money(200)}])

        expect(result).toEqual({
            appliedToItems: [{name: "Baked Beans", price: new Money(200)}],
            discountAmount: new Money(100)
        })
    })

    it("rounds the discount when the discount is a non-integer amount", () => {
        const sut = new PercentageOffer("Baked Beans", 0.5)

        const result = sut.apply([{name: "Baked Beans", price: new Money(99)}])

        expect(result).toEqual({
            appliedToItems: [{name: "Baked Beans", price: new Money(99)}],
            discountAmount: new Money(50)
        })
    })

    it("discounts multiple products by the percentage combined", () => {
        const sut = new PercentageOffer("Baked Beans", 0.252)

        const result = sut.apply([
            {name: "Baked Beans", price: new Money(100)},
            {name: "Baked Beans", price: new Money(100)},
            {name: "Baked Beans", price: new Money(100)}
        ])

        expect(result).toEqual({
            appliedToItems: [
                {name: "Baked Beans", price: new Money(100)},
                {name: "Baked Beans", price: new Money(100)},
                {name: "Baked Beans", price: new Money(100)}
            ],
            discountAmount: new Money(76)
        })
    })

    it("does not discount items that do not match the discount item name", () => {
        const sut = new PercentageOffer("Baked Beans", 0.5)

        const result = sut.apply([
            {name: "Baked Beans", price: new Money(100)},
            {name: "Fish", price: new Money(599)}
        ])

        expect(result).toEqual({
            appliedToItems: [
                {name: "Baked Beans", price: new Money(100)}
            ],
            discountAmount: new Money(50)
        })
    })

    it("returns no discount if no items match the discount name", () => {
        const sut = new PercentageOffer("Baked Beans", 0.5)

        const result = sut.apply([
            {name: "Chips", price: new Money(299)},
            {name: "Fish", price: new Money(599)}
        ])

        expect(result).toEqual({
            appliedToItems: [],
            discountAmount: new Money(0)
        })
    })

    it("requires a percentage greater than zero", () => {

        expect(() => new PercentageOffer("Baked Beans", 0)).toThrow()
        expect(() => new PercentageOffer("Baked Beans", 0.01)).not.toThrow()
    })

    it("requires a percentage less than or equal to 100%", () => {

        expect(() => new PercentageOffer("Baked Beans", 1.01)).toThrow()
        expect(() => new PercentageOffer("Baked Beans", 1)).not.toThrow()
    })

    it("requires a product name", () => {

        expect(() => new PercentageOffer(null, 0.5)).toThrow()
    })


});