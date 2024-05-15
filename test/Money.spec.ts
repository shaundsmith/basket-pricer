import Money from "../src/Money";

describe("Money specifications", () => {

    it("formats the money to 2 decimal places", () => {

        const money = new Money(150)

        expect(money.format()).toEqual("1.50")
    })

    it("adds two money values together", () => {

        const money1 = new Money(100)
        const money2 = new Money(150)

        const result = money1.add(money2)

        expect(result.format()).toEqual("2.50")
        // Ensure money remains immutable
        expect(money1.format()).toEqual("1.00")
        expect(money2.format()).toEqual("1.50")
    })

    it("subtracts two money values", () => {

        const money1 = new Money(250)
        const money2 = new Money(150)

        const result = money1.minus(money2)

        expect(result.format()).toEqual("1.00")
        // Ensure money remains immutable
        expect(money1.format()).toEqual("2.50")
        expect(money2.format()).toEqual("1.50")
    })

    it("multiplies a money value", () => {

        const money = new Money(250)

        const result = money.multiply(3)

        expect(result.format()).toEqual("7.50")
        // Ensure money remains immutable
        expect(money.format()).toEqual("2.50")
    })

    it("multiplies a money value by a percentage", () => {

        const money = new Money(250)

        const result = money.multiply(0.5)

        expect(result.format()).toEqual("1.25")
        // Ensure money remains immutable
        expect(money.format()).toEqual("2.50")
    })

    it("rounds decimal values", () => {

        const money = new Money(49.57)

        expect(money.format()).toEqual("0.50")
    })


})