import { NavLink } from "react-router"
import "../styles/Navigation.css"

export const Navigation = () => {
    return (
        <nav id="main-nav">
            <ul>
                <li>
                    <NavLink to={"/"}>Hem</NavLink>
                </li>
                <li>
                    <NavLink to={"/products"}>Sortiment</NavLink>
                </li>
                <li>
                    <NavLink to={"/admin/products"}>Admin</NavLink>
                </li>
                <li>
                    <NavLink to={"/checkout"}>Checkout</NavLink>
                </li>
                
            </ul>
        </nav>
    )
}