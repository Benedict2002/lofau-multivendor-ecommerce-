import type { Product } from "./ProductType";
import type { User } from "./UserType";

export interface Wishlist{
    id: number;
    use: User;
    products: Product[];

}

export interface WishlistState{
    wishlist:Wishlist | null;
    loading: boolean;
    error: string | null;
}



export interface AddProductToWishListPayload{
    wishlistId: number;
    productId: number;
}