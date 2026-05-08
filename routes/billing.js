require("dotenv").config();

const router =
  require("express").Router();

const Stripe =
  require("stripe");

const auth =
  require("../middleware/auth");

const stripe =
  Stripe(
    process.env.STRIPE_SECRET_KEY
  );

/* ---------------- CREATE CHECKOUT ---------------- */

router.post(
  "/create-checkout",
  auth,
  async (req, res) => {

    try {

      const { plan } =
        req.body;

      let price = 0;

      /* ---------------- VIP PRICES ---------------- */

      if (plan === "VIP 1") {
        price = 700;
      }

      if (plan === "VIP 2") {
        price = 1500;
      }

      if (plan === "VIP 3") {
        price = 3000;
      }

      if (plan === "VIP 4") {
        price = 5000;
      }

      /* ---------------- INVALID PLAN ---------------- */

      if (price === 0) {

        return res.status(400).json({
          error: "Invalid VIP plan"
        });
      }

      /* ---------------- CREATE STRIPE SESSION ---------------- */

      const session =
        await stripe.checkout.sessions.create({

          metadata: {
            userId:
              req.user.id.toString(),

            vipPlan:
              plan
          },

          payment_method_types: [
            "card"
          ],

          mode: "payment",

          line_items: [
            {
              price_data: {

                currency: "usd",

                product_data: {
                  name: plan
                },

                unit_amount:
                  price
              },

              quantity: 1
            }
          ],

          success_url:
            "http://localhost:5173/success",

          cancel_url:
            "http://localhost:5173/cancel"
        });

      /* ---------------- RESPONSE ---------------- */

      res.json({
        url: session.url
      });

    } catch (err) {

      console.log(
        "STRIPE ERROR:"
      );

      console.log(err);

      res.status(500).json({
        error: err.message
      });
    }
  }
);

module.exports = router;