import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./CartSlice";
import wishlistReducer from "./WishlistSlice";
import productsReducer from "./ProductsSlice";
import ordersReducer from "./OrdersSlice";


const myStore = configureStore({
    reducer: {
        cart: cartReducer,
        wishlist: wishlistReducer,
        products: productsReducer,
        orders: ordersReducer
    }        
})

export default myStore