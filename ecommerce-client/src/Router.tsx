import { createBrowserRouter } from "react-router";
import { Layout } from "./pages/Layout";
import { NotFound } from "./pages/NotFound";
import { Home } from "./pages/Home";
import { ManageProducts } from "./pages/ManageProducts";
import { CreateProduct } from "./pages/CreateProduct";
import { UpdateProduct } from "./pages/UpdateProduct";
import { Products } from "./pages/Products";
import { ManageOrders } from "./pages/ManageOrders";

export const router = createBrowserRouter( [
    {
        path: "/",
        element: <Layout />,
        errorElement: <NotFound />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/products",
                element: <Products />
            },
            {
                path: "/admin/products",
                element: <ManageProducts />
            },
             {
                path: "/admin/create-product",
                element: <CreateProduct />
             },
             {
                path: "/admin/update-product/:id",
                element: <UpdateProduct />
             },
             {
                path: "admin/orders",
                element: <ManageOrders />
             }
             
                
        ]
    }
])