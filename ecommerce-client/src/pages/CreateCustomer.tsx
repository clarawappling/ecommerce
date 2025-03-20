import { ChangeEvent, FormEvent, useState } from "react"
import { CustomerCreate } from "../models/Customer"
import { useCustomer } from "../hooks/useCustomer"
import { useLocation, useNavigate } from "react-router"

export const CreateCustomer = () => {
    
    const [customer, setCustomer] = useState<CustomerCreate>({
        firstname: "", 
        lastname: "", 
        phone: "", 
        email: "",  
        postal_code: "", 
        country: "", 
        city: "", 
        street_address: ""})

    const {error, isLoading, createCustomerHandler} = useCustomer();
    const navigate = useNavigate();
    const location = useLocation();

    const handleChange= (e: ChangeEvent<HTMLInputElement>) => {
        if(!customer) return;
        const {name, value} = e.target
        setCustomer({...customer, [name]: value})
    }
    const handleClick = ()=> {
        if (location.pathname === "/admin/create-customer") {
            navigate("/admin/customers");
         }
         if (location.pathname === "/checkout") {
            navigate("/cart-page");
         }
     }

       const handleSubmit = async (e: FormEvent) => {
             e.preventDefault();
             if(!customer) return;
             await createCustomerHandler({
                 firstname: customer.firstname,
                 lastname: customer.lastname,
                 email: customer.email,
                 phone: customer.phone,
                 street_address: customer.street_address,
                 postal_code: customer.postal_code,
                 city: customer.city,
                 country: customer.country,
             });
             if (location.pathname === "/admin/create-customer") {
                navigate("/admin/customers");
             }
             if (location.pathname === "/checkout") {
                navigate("/cart-page");
             }
          }

          
    if(isLoading) return <p>Loading..</p>
    if(error) return <p>{error}</p>

    return (
            <>
            <div className="customer-container">
                <h2>Kundens information</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="firstname">Förnamn: </label>
                    <input
                        name="firstname"
                        id="firstname"
                        value={customer?.firstname ?? ''}
                        onChange={(e) => {handleChange(e)}}
                    />
                       <label htmlFor="lastname">Efternamn: </label>
                    <input
                        name="lastname"
                        id="lastname"
                        value={customer?.lastname ?? ''}
                        onChange={(e) => {handleChange(e)}}
                    />
                       <label htmlFor="email">E-mail: </label>
                    <input
                        name="email"
                        id="email"
                        value={customer?.email ?? ''}
                        onChange={(e) => {handleChange(e)}}
                    />
                       <label htmlFor="phone">Telefonnummer: </label>
                    <input
                        name="phone"
                        id="phone"
                        value={customer?.phone ?? ''}
                        onChange={(e) => {handleChange(e)}}
                    />
                
                       <label htmlFor="street_address">Gatuadress: </label>
                    <input
                        name="street_address"
                        id="street_address"
                        value={customer?.street_address ?? ''}
                        onChange={(e) => {handleChange(e)}}
                    />
                       <label htmlFor="postal_code">Postkod: </label>
                    <input
                        name="postal_code"
                        id="postal_code"
                        value={customer?.postal_code ?? ''}
                        onChange={(e) => {handleChange(e)}}
                    />
                    <label htmlFor="city">Ort: </label>
                      <input
                        name="city"
                        id="city"
                        value={customer?.city ?? ''}
                        onChange={(e) => {handleChange(e)}}
                    />
                       <label htmlFor="country">Land: </label>
                    <input
                        name="country"
                        id="country"
                        value={customer?.country ?? ''}
                        onChange={(e) => {handleChange(e)}}
                    />
                    <button>Spara kundinformation</button>
                   
                </form>
                <br></br>
                
                <button onClick={handleClick}>Avbryt</button>
            </div>
            </>
        )
}