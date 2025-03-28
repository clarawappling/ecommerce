// import { useNavigate } from "react-router"
// import { useCustomer } from "../hooks/useCustomer";
// import { useEffect } from "react";

// export const ManageCustomers = () => {
    
//     const navigate = useNavigate();
//     const {customers, getAllCustomersHandler, deleteCustomerHandler, error, isLoading} = useCustomer();

// useEffect(() => {
//     getAllCustomersHandler();
// }, [])
    
// const handleClick = (id: number) => {
//     navigate("/admin/update-customer/"+id);
// }

// const handleCreate = () => {
//     navigate("/admin/create-customer");
// }

// if(isLoading) return <span className="loader"></span>
// if(error) return <p>{error}</p>
    
//     return (
//         <>
//         <div>
//             <h1>Kundregister</h1>
//             <button onClick={handleCreate}>Lägg till ny kund</button>
//             <div className="customer-list">
//                 {
//                     customers.map((customer) => (
//                         <article className="product-item" key={customer.id}>
//                             <p>{customer.firstname} {customer.lastname}</p>
//                             <button onClick={() => {deleteCustomerHandler(customer.id)}}>Ta bort</button>
//                             <button onClick={() => {handleClick(customer.id)}}>Uppdatera kundinformation</button>
//                         </article>
//                     )
//                     )
//                 }
//             </div>
         
//         </div>
//         </>
//     )
// }

import { useNavigate } from "react-router"
import { useCustomer } from "../hooks/useCustomer";
import { useEffect } from "react";
import "../styles/ManageCustomers.css"

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
            <button className= "add-customer-btn" onClick={handleCreate}>Lägg till ny kund</button>
            <div className="overflow-container">
                <table>
                <tr>

                    <th>Kundnummer</th>
                    <th>Namn</th>
                    <th>E-mail</th>
                    <th>Telefonnummer</th>
                    <th>Ta bort</th>
                    <th>Uppdatera</th>
                </tr>
                {
                    customers.map((customer) => (
                        <tr key={customer.id}>
                            <td>{customer.id}</td>
                            <td>{customer.firstname} {customer.lastname}</td>
                            <td>{customer.email}</td>
                            <td>{customer.phone}</td>
                            <td><button onClick={() => {deleteCustomerHandler(customer.id)}}>Ta bort</button></td>
                            <td><button onClick={() => {handleClick(customer.id)}}>Uppdatera kundinformation</button></td>
                        </tr>
                    )
                    )
                } 
                </table>
            </div>
         
        </div>
        </>
    )
}