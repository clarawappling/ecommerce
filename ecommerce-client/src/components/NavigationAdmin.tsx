import { NavLink } from "react-router"
import "../styles/Navigation.css"

export const NavigationAdmin = () => {
    return (
        <nav id="admin-nav">
            <ul>
                <li>
                    <NavLink to={"/admin/create-product"}>Lägg till produkt</NavLink>
                </li>
              
                <li>
                    <NavLink to={"/admin/products"}>Produktlista</NavLink>
                </li>

                <li>
                    <NavLink to={"/admin/orders"}>Orderlista</NavLink>
                </li>
                {/* Lägg till customers och ordrar */}
            </ul>
        </nav>
    )
}