require("dotenv").config();

const router =
  require("express").Router();

const auth =
  require("../middleware/auth");

/* ---------------- STRIPE DISABLED ---------------- */

router.post(
  "/create-checkout",
  auth,
  async (req, res) => {

    return res.status(503).json({
      error:
        "Stripe temporarily disabled. Use USDT payment."
    });
  }
);

module.exports = router;