const router =
  require("express").Router();

const auth =
  require("../middleware/auth");

const db =
  require("../config/db");

/* ---------------- USDT PAYMENT ---------------- */

router.post(
  "/create-checkout-session",
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

        walletAddress:
          "TNr7k7aSxn7JmVxBZikwHe2yFgV2rWxMTf",

        network:
          "TRC20",

        message:
          "Send USDT then wait for approval"

      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        error: "Server error"
      });

    }

  }
);

module.exports = router;