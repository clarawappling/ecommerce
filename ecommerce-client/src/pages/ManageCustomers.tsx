import { useNavigate } from "react-router"
import { NavigationAdmin } from "../components/NavigationAdmin"
import { useCustomer } from "../hooks/useCustomer";
import { useEffect } from "react";

export const ManageCustomers = () => {
    
    const navigate = useNavigate();
    const {customers, getAllCustomersHandler, deleteCustomerHandler, error, isLoading} = useCustomer();

useEffect(() => {
    getAllCustomersHandler();
}, [])
    
const handleClick = (id: number) => {
    navigate("/admin/update-customer/"+id);
}
    return (

        <>
        <NavigationAdmin />
        <div>
            <h2>Kundregister</h2>
            <div className="customer-list">
                {
                    customers.map((customer) => (
                        <article className="product-item" key={customer.id}>
                            <p>{customer.firstname} {customer.lastname}</p>
                            <button onClick={() => {deleteCustomerHandler(customer.id)}}>Ta bort</button>
                            <button onClick={() => {handleClick(customer.id)}}>Uppdatera kundinformation</button>
                    
                        </article>
                    )
                    )
                }
            </div>
         
        </div>
        </>
    )
}