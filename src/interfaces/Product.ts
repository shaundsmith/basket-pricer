import {Money} from "../types/Money";

export default interface Product {
    id: string
    name: string
    price: Money
}
