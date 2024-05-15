/**
 * Represents a monetary value.
 *
 * The monetary value is provided as an integer. e.g. new Money(250) represents £2.50.
 */
export default class Money {

    readonly amount: number
    readonly decimalPlaces: number = 2

    constructor(amount: number) {
        this.amount = Math.round(amount)
    }

    /**
     * Formats the money as a decimal, based on the configured number of decimal places.
     */
    format(): string {

        const decimalValue = this.amount / Math.pow(10, this.decimalPlaces)
        return (decimalValue).toFixed(this.decimalPlaces)
    }

    /**
     * Adds this money to the provided money and returns the results.
     *
     * This object instance is not modified.
     *
     * @param other the other money object
     */
    add(other: Money): Money {

        return new Money(this.amount + other.amount)
    }

    /**
     * Subtracts the provided money from this money and returns the result.
     *
     * This object instance is not modified.
     *
     * @param other the other money object
     */
    minus(other: Money): Money {

        return new Money(this.amount - other.amount)
    }

    /**
     * Multiplies this money by the provided multiplier and returns the result.
     *
     * This object instance is not modified.
     *
     * @param multiplier the multiplier
     */
    multiply(multiplier: number): Money {

        return new Money(this.amount * multiplier)
    }

}