const router =
  require("express").Router();

const auth =
  require("../middleware/auth");

const db =
  require("../config/db");

/* ---------------- ADMIN CHECK ---------------- */

router.use(auth);

router.use((req, res, next) => {

  if (req.user.role !== "admin") {

    return res.status(403).json({
      error: "Access denied"
    });

  }

  next();

});

/* ---------------- DASHBOARD STATS ---------------- */

router.get(
  "/stats",
  async (req, res) => {

    try {

      /* TOTAL USERS */

      const users =
        await db.query(
          `
          SELECT COUNT(*) AS total
          FROM users
          `
        );

      /* TOTAL PAYMENTS */

      const payments =
        await db.query(
          `
          SELECT COUNT(*) AS total
          FROM payments
          `
        );

      /* TOTAL REVENUE */

      const revenue =
        await db.query(
          `
          SELECT
          COALESCE(SUM(amount),0)
          AS total
          FROM payments
          `
        );

      /* LATEST PAYMENTS */

      const latestPayments =
        await db.query(
          `
          SELECT
            payments.id,
            payments.plan,
            payments.amount,
            payments.status,
            users.username
          FROM payments
          JOIN users
          ON users.id = payments.user_id
          ORDER BY payments.id DESC
          LIMIT 10
          `
        );

      res.json({

        totalUsers:
          users.rows[0].total,

        totalPayments:
          payments.rows[0].total,

        totalRevenue:
          revenue.rows[0].total,

        latestPayments:
          latestPayments.rows

      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        error: err.message
      });

    }

  }
);

/* ---------------- GET WITHDRAW REQUESTS ---------------- */

router.get(
  "/withdraws",
  async (req, res) => {

    try {

      const withdraws =
        await db.query(
          `
          SELECT
            withdraw_requests.id,
            withdraw_requests.user_id,
            withdraw_requests.amount,
            withdraw_requests.wallet_address,
            withdraw_requests.status,
            withdraw_requests.created_at,
            users.username
          FROM withdraw_requests
          JOIN users
          ON users.id = withdraw_requests.user_id
          ORDER BY withdraw_requests.id DESC
          `
        );

      res.json(
        withdraws.rows
      );

    } catch (err) {

      console.log(err);

      res.status(500).json({
        error: err.message
      });

    }

  }
);

/* ---------------- UPDATE WITHDRAW STATUS ---------------- */

router.put(
  "/withdraws/:id",
  async (req, res) => {

    const client =
      await db.connect();

    try {

      await client.query("BEGIN");

      const { id } =
        req.params;

      const { status } =
        req.body;

      if (
        status !== "approved" &&
        status !== "rejected"
      ) {

        await client.query("ROLLBACK");

        return res.status(400).json({
          error: "Invalid status"
        });

      }

      /* ---------------- GET REQUEST ---------------- */

      const requestResult =
        await client.query(
          `
          SELECT *
          FROM withdraw_requests
          WHERE id=$1
          FOR UPDATE
          `,
          [id]
        );

      const request =
        requestResult.rows[0];

      if (!request) {

        await client.query("ROLLBACK");

        return res.status(404).json({
          error: "Request not found"
        });

      }

      /* ---------------- ONLY PENDING ---------------- */

      if (
        request.status !== "pending"
      ) {

        await client.query("ROLLBACK");

        return res.status(400).json({
          error:
            "Request already processed"
        });

      }

      /* ---------------- UPDATE STATUS ---------------- */

      await client.query(
        `
        UPDATE withdraw_requests
        SET status=$1
        WHERE id=$2
        `,
        [
          status,
          id
        ]
      );

      /* ---------------- REFUND POINTS ---------------- */

      if (
        status === "rejected"
      ) {

        const refundAmount =
          Number(request.amount);

        await client.query(
          `
          INSERT INTO points_transactions
          (
            user_id,
            amount
          )
          VALUES($1, $2)
          `,
          [
            request.user_id,
            refundAmount
          ]
        );

      }

      await client.query("COMMIT");

      res.json({
        message:
          "Withdraw updated"
      });

    } catch (err) {

      await client.query(
        "ROLLBACK"
      );

      console.log(err);

      res.status(500).json({
        error: err.message
      });

    } finally {

      client.release();

    }

  }
);

/* ---------------- GET PAYMENT REQUESTS ---------------- */

router.get(
  "/payments",
  async (req, res) => {

    try {

      const payments =
        await db.query(
          `
          SELECT
            payment_requests.id,
            payment_requests.user_id,
            payment_requests.plan_name,
            payment_requests.amount,
            payment_requests.status,
            payment_requests.created_at,
            users.username
          FROM payment_requests
          JOIN users
          ON users.id =
          payment_requests.user_id
          ORDER BY payment_requests.id DESC
          `
        );

      res.json(
        payments.rows
      );

    } catch (err) {

      console.log(err);

      res.status(500).json({
        error: err.message
      });

    }

  }
);

/* ---------------- APPROVE PAYMENT ---------------- */

router.put(
  "/payments/:id",
  async (req, res) => {

    try {

      const { id } =
        req.params;

      const { status } =
        req.body;

      /* ---------------- GET PAYMENT ---------------- */

      const paymentResult =
        await db.query(
          `
          SELECT *
          FROM payment_requests
          WHERE id=$1
          `,
          [id]
        );

      const payment =
        paymentResult.rows[0];

      if (!payment) {

        return res.status(404).json({
          error: "Payment not found"
        });

      }

      /* ---------------- UPDATE STATUS ---------------- */

      await db.query(
        `
        UPDATE payment_requests
        SET status=$1
        WHERE id=$2
        `,
        [
          status,
          id
        ]
      );

      /* ---------------- ACTIVATE VIP ---------------- */

      if (
        status === "approved"
      ) {

        await db.query(
          `
          UPDATE users
          SET plan=$1
          WHERE id=$2
          `,
          [
            payment.plan_name,
            payment.user_id
          ]
        );

        /* ---------------- GET USER ---------------- */

        const userResult =
          await db.query(
            `
            SELECT *
            FROM users
            WHERE id=$1
            `,
            [payment.user_id]
          );

        const user =
          userResult.rows[0];

        /* ---------------- REFERRAL BONUS ---------------- */

        if (
          user.referred_by
        ) {

          const referrerResult =
            await db.query(
              `
              SELECT *
              FROM users
              WHERE referral_code=$1
              `,
              [
                user.referred_by
              ]
            );

          const referrer =
            referrerResult.rows[0];

          if (referrer) {

            let reward = 0;

            /* ---------------- VIP REWARDS ---------------- */

            if (
              payment.plan_name === "VIP 1"
            ) {

              reward = 25;

            }

            if (
              payment.plan_name === "VIP 2"
            ) {

              reward = 60;

            }

            if (
              payment.plan_name === "VIP 3"
            ) {

              reward = 150;

            }

            if (
              payment.plan_name === "VIP 4"
            ) {

              reward = 350;

            }

            if (
              payment.plan_name === "VIP 5"
            ) {

              reward = 700;

            }

            /* ---------------- ADD POINTS ---------------- */

            await db.query(
              `
              INSERT INTO points_transactions
              (
                user_id,
                amount
              )
              VALUES($1, $2)
              `,
              [
                referrer.id,
                reward
              ]
            );

          }

        }

      }

      res.json({
        message:
          "Payment updated"
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        error: err.message
      });

    }

  }
);

module.exports = router;;