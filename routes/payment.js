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
        amount,
        txid
      } = req.body;

      await db.query(

        `
        INSERT INTO payment_requests
        (
          user_id,
          plan_name,
          amount,
          txid
        )
        VALUES ($1, $2, $3, $4)
        `,

        [
          req.user.id,
          planName,
          amount,
          txid
        ]
      );

      res.json({

        success: true,

        walletAddress:
          "YOUR_WALLET",

        network:
          "TRC20",

        planName:
          planName,

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