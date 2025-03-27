import { useNavigate } from "react-router"
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

const handleCreate = () => {
    navigate("/admin/create-customer");
}

if(isLoading) return <span className="loader"></span>
if(error) return <p>{error}</p>
    
    return (
        <>
        <div>
            <h1>Kundregister</h1>
            <button onClick={handleCreate}>Lägg till ny kund</button>
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