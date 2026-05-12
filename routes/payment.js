const router = require("express").Router();

const Stripe = require("stripe");

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY
);

router.post(
  "/create-checkout-session",
  async (req, res) => {

    try {

      const session =
        await stripe.checkout.sessions.create({

          payment_method_types: ["card"],

          mode: "payment",

          line_items: [
            {
              price_data: {
                currency: "usd",

                product_data: {
                  name: "VIP Plan"
                },

                unit_amount: 999
              },

              quantity: 1
            }
          ],

          success_url:
            `${process.env.CLIENT_URL}/success`,

          cancel_url:
            `${process.env.CLIENT_URL}/cancel`
        });

      res.json({
        url: session.url
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        error: "Stripe error"
      });
    }
  }
);

module.exports = router;