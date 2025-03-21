import { Cart } from "../components/Cart"
import * as React from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';
import CartContext from "../contexts/CartContext";
import { CustomerCreate } from "../models/Customer";
import { getCustomerByEmail } from "../services/customerService";
import { useCustomer } from "../hooks/useCustomer";


const stripePromise = loadStripe('pk_test_51R4JflEUcfJR78A9I4729RJfcSNRKqB9njUYAcAAmJTLHAsbn8xWDNaakNUUyvbP2dHDE0UisUraA1GgHnwmmg1F00aCscjeAl')

export const Checkout = () => {

  const {cart} = React.useContext(CartContext)
  const {getCustomerByEmailHandler, createCustomerHandler} = useCustomer();

// Initialize customer state with localStorage if appliable
  const [customer, setCustomer] = React.useState<CustomerCreate>(() => {
    const savedCustomer = localStorage.getItem('customer');
    return savedCustomer ? JSON.parse(savedCustomer) :
    {
        firstname: "", 
        lastname: "", 
        phone: "", 
        email: "",  
        postal_code: "", 
        country: "", 
        city: "", 
        street_address: ""}})

    const [customerIsCreated, setCustomerIsCreated] = React.useState(false);

// Stripe integration
    const fetchClientSecret = React.useCallback(() => {
        return fetch("http://localhost:3000/stripe/create-checkout-session-embedded", {
          method: "POST",
        })
          .then((res) => res.json())
          .then((data) => data.clientSecret);
      }, []);
    const options = {fetchClientSecret};
    

// Handle customer form changes
     const handleChange= (e: React.ChangeEvent<HTMLInputElement>) => {
            if(!customer) return;
            const {name, value} = e.target
            setCustomer({...customer, [name]: value})
        }

// Handle sumbit of customer form
        const handleSubmit = (e: React.FormEvent) => {
          e.preventDefault();
          if(!customer) return;
          localStorage.setItem('customer', JSON.stringify(customer))
          setCustomerIsCreated(true);
        }



const handleClick = async () => {
  console.log(customer.email)
  
  try {
const response = await getCustomerByEmailHandler(customer.email);
const customerId = response.id;
console.log("Existing Customer ID:", customerId);


  } catch {
    const response = await createCustomerHandler(customer)
    const customerId = response.id;
    console.log("New Customer ID:", customerId);
    
  } 
}



    return (
        <>
        <h1>Checkout</h1>
        <h2>Varukorg</h2>
        <Cart/>
{
  cart.length > 0 && (
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
                        required
                    />
                       <label htmlFor="lastname">Efternamn: </label>
                    <input
                        name="lastname"
                        id="lastname"
                        value={customer?.lastname ?? ''}
                        onChange={(e) => {handleChange(e)}}
                        required
                    />
                       <label htmlFor="email">E-mail: </label>
                    <input
                        name="email"
                        id="email"
                        value={customer?.email ?? ''}
                        onChange={(e) => {handleChange(e)}}
                        required
                    />
                       <label htmlFor="phone">Telefonnummer: </label>
                    <input
                        name="phone"
                        id="phone"
                        value={customer?.phone ?? ''}
                        onChange={(e) => {handleChange(e)}}
                        required
                    />
                
                       <label htmlFor="street_address">Gatuadress: </label>
                    <input
                        name="street_address"
                        id="street_address"
                        value={customer?.street_address ?? ''}
                        onChange={(e) => {handleChange(e)}}
                        required
                    />
                       <label htmlFor="postal_code">Postkod: </label>
                    <input
                        name="postal_code"
                        id="postal_code"
                        value={customer?.postal_code ?? ''}
                        onChange={(e) => {handleChange(e)}}
                        required
                    />
                    <label htmlFor="city">Ort: </label>
                      <input
                        name="city"
                        id="city"
                        value={customer?.city ?? ''}
                        onChange={(e) => {handleChange(e)}}
                        required
                    />
                       <label htmlFor="country">Land: </label>
                    <input
                        name="country"
                        id="country"
                        value={customer?.country ?? ''}
                        onChange={(e) => {handleChange(e)}}
                        required
                    />
                    { customerIsCreated === false && (
                    <button>Spara uppgifter och gå till nästa steg</button>
                  )}
                </form>
            </div>

            { customerIsCreated === true && (
              <button onClick={() => {handleClick(customer?.email)}} className="happy-btn">Betala</button>
              )}
             { customerIsCreated === true && (
            
  <div id="stripe-container">
  <EmbeddedCheckoutProvider
      stripe={stripePromise}
      options={options}
    >
      <EmbeddedCheckout />
    </EmbeddedCheckoutProvider>
    </div> )}
</>
)}
      
        </>
    )
}