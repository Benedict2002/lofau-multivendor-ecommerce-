import type { Order } from "./orderType";
import type { Seller } from "./SellerType";
import type { User } from "./UserType";

export interface Transaction {
    id: number;
    customer: User;
    order: Order;
    seller: Seller;
    date: string;
}