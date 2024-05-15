import * as productCatalogueJson from "./ProductCatalogue.json"
import * as basketJson from "./Basket.json"
import BasketPricer, {Mode} from "../src/BasketPricer";
import Money from "../src/Money";
import ProductCatalogue from "../src/interfaces/ProductCatalogue";
import Basket from "../src/interfaces/Basket";
import offers from "./Offers";

function buildProductCatalogue(json: any): ProductCatalogue {

    const products = json.products.map(product => ({
        name: product.name,
        price: new Money(product.price)
    }))

    return {
        products
    }
}


const pricer = new BasketPricer(buildProductCatalogue(productCatalogueJson), offers, Mode.BEST_OFFER)

const result = pricer.calculatePrice((basketJson as Basket))

console.log(`
Basket price result:
  Subtotal: ${result.subtotal.format()}
  Discount: ${result.discount.format()}
  _____________________________________
  Total:    ${result.total.format()}
`)