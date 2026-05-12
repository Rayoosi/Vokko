require("dotenv").config();

const router =
  require("express").Router();

const auth =
  require("../middleware/auth");

const db =
  require("../config/db");

/* ---------------- USDT PAYMENT REQUEST ---------------- */

router.post(
  "/create-checkout",
  auth,
  async (req, res) => {

    try {

      const {
        planName,
        amount
      } = req.body;

      await db.query(

        `
        INSERT INTO payment_requests
        (
          user_id,
          plan_name,
          amount
        )
        VALUES ($1, $2, $3)
        `,

        [
          req.user.id,
          planName,
          amount
        ]
      );

      res.json({

        success: true,

        message:
          "USDT payment request created"

      });

    } catch (err) {

      console.error(err);

      res.status(500).json({
        error: "Server error"
      });

    }

  }
);

module.exports = router;