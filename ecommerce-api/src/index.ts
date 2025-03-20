import dotenv from "dotenv";
import express, { Request, Response } from "express";
import {connectDB} from "./config/db";
import cors from "cors";

dotenv.config();
const app = express();

// Middleware
app.use(express.json())
app.use(cors())

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)


app.post('/stripe/create-checkout-session-embedded', async (req: Request, res: Response) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'sek',
          product_data: {
            name: 'UV-penna',
            // Dynamiskt namn
            images: ['https://img.joomcdn.net/7ee972db7338d050cc20d8ed0a9fdc71281c4119_original.jpeg']
            // Dynamisk bildlänk
          },
          unit_amount: 169 * 100,
          // unit_amount= Dynamiskt item-price * 100
        },
        quantity: 4,
        // Dynamisk kvantitet
      },
      {
        price_data: {
          currency: 'SEK',
          product_data: {
            name: 'Kulbana',
            images: ['https://media.lekia.se/lekia/images/g-brio-10922426-2023-10-26-131441191/0/0/0/gravitrax-pro-starter-set-vertical.jpg']
          },
          unit_amount: 1500 * 100,
        },
        quantity: 1,
      }
    ],
    mode: 'payment',
    ui_mode: 'embedded',
    return_url: 'http://localhost:5173/order-confirmation?session_id={CHECKOUT_SESSION_ID}',
    client_reference_id: '123'
    // Client ref id = dynamiskt order-id
  });

  // res.json(session)
  res.send({clientSecret: session.client_secret});
});

// Routes
import productRouter from "./routes/products";
import customerRouter from "./routes/customers";
import orderRouter from "./routes/orders";
import orderItemRouter from "./routes/orderItems";
app.use('/products', productRouter)
app.use('/customers', customerRouter)
app.use('/orders', orderRouter)
app.use('/order-items', orderItemRouter)


// Attempt to connect to the database
connectDB()
// Start Express server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`The server is running at http://localhost:${PORT}`);
})
