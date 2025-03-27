import { NavLink, Outlet } from "react-router"
import { Navigation } from "../components/Navigation"

export const Layout = () => {
    
    return (
    <>
    <header> 
        <Navigation />
    </header>
    <main>
        <Outlet />
    </main>

    <footer> <NavLink to={"/admin"}>Adminläge</NavLink> </footer>   
    </>
)
}