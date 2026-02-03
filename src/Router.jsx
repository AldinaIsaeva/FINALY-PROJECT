import { createBrowserRouter } from "react-router-dom";
import Layout from "./COMPONENTS/LAYOUT/Layout";
import Home from "./PAGES/Home";
import About from "./PAGES/About";
import NotFound from "./PAGES/NotFound";
import Wholesale from "./PAGES/Wholesale";
import Contacts from "./PAGES/Contacts";
import Careers from "./PAGES/Careers";
import Reviews from "./PAGES/Reviews";
import Retail from "./PAGES/Retail";
import Account from "./PAGES/Account";
import Politic from "./PAGES/Politic";
import Wishlist from "./PAGES/Wishlist";
import Cart from "./PAGES/Cart";
import With from "./PAGES/With";
import Quality from "./PAGES/Quality";
import Price from "./PAGES/Price";
import AdminProductsPage from "./PAGES/AdminProductsPage";
import Checkout from "./PAGES/Checkout";
import OrderSuccess from "./PAGES/OrderSuccess";
import ProtectedRoute from "./components/ProtectedRoute";

const myRouter = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "",
                element: <Home />
            },

            {
                path: "about",
                element: <About />
            },

            {
                path: "*",
                element: <NotFound />
            },

            {
                path: "wholesale",
                element: <Wholesale />
            },

            {
                path: "retail",
                element: <Retail />
            },

            {
                path: "contacts",
                element: <Contacts />
            },

            {
                path: "careers",
                element: <Careers />
            },

            {
                path: "reviews",
                element: <Reviews />
            },

            {
                path: "account",
                element: <Account />
            },

            {
                path: "politic",
                element: <Politic />
            },

            {
                path: "wishlist",
                element: <Wishlist />
            },

            {
                path: "cart",
                element: <Cart />
            },

            {
                path: "with",
                element: <With />
            },

            {
                path: "quality",
                element: <Quality />
            },

            {
                path: "price",
                element: <Price />
            },

            {
                path: "checkout",
                element: (
                    <ProtectedRoute>
                        <Checkout />
                    </ProtectedRoute>
                )
            },

            {
                path: "order-success",
                element: <OrderSuccess />
            },

            {
                path: "admin/products",
                element: <AdminProductsPage />
            }

        ]
    }
])

export default myRouter   