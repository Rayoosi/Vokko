require("dotenv").config();

const router =
  require("express").Router();

const Stripe =
  require("stripe");

const db =
  require("../config/db");

const stripe =
  Stripe(
    process.env.STRIPE_SECRET_KEY
  );

/* ---------------- STRIPE WEBHOOK ---------------- */

router.post(
  "/",
  async (req, res) => {

    try {

      const event =
        req.body;

      /* PAYMENT SUCCESS */

      if (
        event.type ===
        "checkout.session.completed"
      ) {

        const session =
          event.data.object;

        const userId =
          session.metadata.userId;

        const vipPlan =
          session.metadata.vipPlan;

        /* UPDATE USER VIP */

        await db.query(
          `
          UPDATE users
          SET vip_level = $1
          WHERE id = $2
          `,
          [
            vipPlan,
            userId
          ]
        );

        /* SAVE PAYMENT */

        await db.query(
          `
          INSERT INTO payments
          (
            user_id,
            plan,
            amount,
            status
          )
          VALUES($1, $2, $3, $4)
          `,
          [
            userId,
            vipPlan,
            session.amount_total / 100,
            "paid"
          ]
        );

        console.log(
          "✅ VIP UPDATED"
        );
      }

      res.json({
        received: true
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        error: err.message
      });
    }
  }
);

module.exports = router;