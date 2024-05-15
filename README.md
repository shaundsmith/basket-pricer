# Basket Pricer

### Assumptions
* Offers cannot stack - if a 2-for-1 offer is applied to an item in a basket, then it cannot also have a 20% discount applied to the same item.
* As per example 2, percentage discounts apply on an entire line item, not individual items. E.g. a 25% discount on sardines @ £1.89 will be £0.47, but a 25% discount on two packs of sardines will be £0.95 as 0.2 * 1.89 * 2 = 0.945.

### Prerequisites

* Latest NodeJS LTS installed
* NPM installed

### Installing

1. Clone the project using Git or download it as a zip file:
   1. `git clone https://github.com/shaundsmith/basket-pricer.git`
   2. [Download from Git](https://github.com/shaundsmith/basket-pricer/archive/refs/heads/main.zip) 
2. Navigate to the project directory
3. Run `npm ci` in the root of the project

### Running the Demo

The demo can be run simply by calling `npm run demo` to use the default demo values.

Prices in the project are represented as integers to prevent floating point rounding issues. An integer of 200 represents a price of £2.00.

If further experimentation is required, the following three files can be modified:
* `demo/Basket.json` - This contains a JSON representation of the basket.
* `demo/ProductCatalogue.json` - This contains a JSON representation of the product catalogue.
* `demo/Offers.ts` - This contains the offers applicable to the baskets.

There are two modes for the main class, the `BasketPricer`: a 'Best Offer' mode and an 'Ordered Offer' mode. This was due to uncertainty around one of the requirements. Usually this would require a conversation with a business analyst. Both interpretations of the requirement have been included as part of this coding kata.

The mode can be switched by updating the third parameter of the BasketPricer constructor in `demo/Demo.ts`.
* `Mode.BEST_OFFER` - This attempts to maximise the discounts for the basket by applying the most beneficial offers first.
* `Mode.ORDERED_OFFERS` - This applies the offers in the order that they are specified in the `BasketPricer` constructor.

### Testing

The unit tests for the project can be run by calling `npm run test`.