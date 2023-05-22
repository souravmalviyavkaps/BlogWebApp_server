import express from 'express';
import Stripe from 'stripe'
const router = express.Router();
import env from '../config/environment.js';
import Order from '../models/Order.js'
import auth from '../middleware/auth.js';

const stripe = Stripe(env.stripe_secret_key)

router.post('/create-checkout-session',auth,  async (req, res) => {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: 'Premium Blogs Subscription',
            },
            unit_amount: 50000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${env.CLIENT_URL}/checkout-success`,
      cancel_url: `${env.CLIENT_URL}`,
    });

    req.user.isPaidUser = true;
    req.user.save();

    await Order.create({
      user: req.user._id,
      orderId: session.id,
      amount: 500
    })
  
    res.send({url: session.url});
  });

  export default router;