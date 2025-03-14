import { NavLink } from "react-router"
import "../styles/Navigation.css"

export const NavigationAdmin = () => {
    return (
        <nav id="admin-nav">
            <ul>
                <li>
                    <NavLink to={"/admin/create-product"}>Lägg till produkt</NavLink>
                    {/* Flytta till produktsidan */}
                </li>
              
                <li>
                    <NavLink to={"/admin/products"}>Produktlista</NavLink>
                </li>

                <li>
                    <NavLink to={"/admin/orders"}>Orderlista</NavLink>
                </li>

                <li>
                    <NavLink to={"/admin/customers"}>Kundregister</NavLink>
                </li>
                
            </ul>
        </nav>
    )
}