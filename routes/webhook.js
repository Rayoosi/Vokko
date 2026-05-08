require("dotenv").config();

const router =
  require("express").Router();

/* ---------------- WEBHOOK DISABLED ---------------- */

router.post(
  "/",
  async (req, res) => {

    return res.json({
      message:
        "Stripe webhook disabled"
    });
  }
);

module.exports = router;