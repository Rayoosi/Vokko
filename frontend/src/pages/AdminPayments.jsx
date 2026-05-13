import {
  useEffect,
  useState
} from "react";

import api from "../api";

function AdminPayments() {

  const [payments, setPayments] =
    useState([]);

  useEffect(() => {

    fetchPayments();

  }, []);

  const fetchPayments =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await api.get(
            "/admin/payments",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

        setPayments(
          res.data
        );

      } catch (err) {

        console.log(err);

      }

    };

  return (

    <div className="text-white">

      <div className="mb-10">

        <h1 className="text-5xl font-black">

          Payment Requests 💳

        </h1>

        <p className="text-slate-400 mt-3 text-xl">

          Manage VIP payment requests.

        </p>

      </div>

      <div className="space-y-6">

        {payments.map((payment) => (

          <div
            key={payment.id}
            className="bg-white/5 border border-white/10 rounded-3xl p-6"
          >

            <div className="flex justify-between items-center gap-6">

              {/* LEFT */}

              <div className="flex-1">

                <h2 className="text-2xl font-black">

                  {payment.username}

                </h2>

                <p className="text-slate-400 mt-3">

                  Plan:
                  {" "}
                  <span className="text-cyan-400 font-bold">

                    {payment.plan_name}

                  </span>

                </p>

                <p className="text-slate-400 mt-2">

                  Amount:
                  {" "}
                  <span className="text-green-400 font-bold">

                    ${payment.amount}

                  </span>

                </p>

                {/* TXID */}

                <p className="text-slate-400 mt-3 break-all">

                  TXID:
                  {" "}

                  <span className="text-cyan-400 text-sm">

                    {payment.txid || "No TXID"}

                  </span>

                </p>

                {/* STATUS */}

                <p className="mt-4">

                  <span className={`px-4 py-2 rounded-2xl text-sm font-bold ${
                    payment.status ===
                    "approved"
                      ? "bg-green-500/20 text-green-400"
                      : payment.status ===
                        "rejected"
                      ? "bg-red-500/20 text-red-400"
                      : "bg-yellow-500/20 text-yellow-400"
                  }`}>

                    {payment.status}

                  </span>

                </p>

              </div>

              {/* BUTTONS */}

              <div className="flex flex-col gap-3">

                {/* APPROVE */}

                <button

                  disabled={
                    payment.status !==
                    "pending"
                  }

                  onClick={async () => {

                    try {

                      const token =
                        localStorage.getItem(
                          "token"
                        );

                      await api.put(

                        `/admin/payments/${payment.id}`,

                        {
                          status:
                            "approved"
                        },

                        {
                          headers: {
                            Authorization:
                              `Bearer ${token}`
                          }
                        }

                      );

                      fetchPayments();

                    } catch (err) {

                      console.log(err);

                    }

                  }}

                  className={`px-5 py-3 rounded-2xl font-bold transition ${
                    payment.status ===
                    "pending"
                      ? "bg-green-500/20 hover:bg-green-500/30 text-green-400"
                      : "bg-gray-500/20 text-gray-500 cursor-not-allowed"
                  }`}

                >

                  Approve ✅

                </button>

                {/* REJECT */}

                <button

                  disabled={
                    payment.status !==
                    "pending"
                  }

                  onClick={async () => {

                    try {

                      const token =
                        localStorage.getItem(
                          "token"
                        );

                      await api.put(

                        `/admin/payments/${payment.id}`,

                        {
                          status:
                            "rejected"
                        },

                        {
                          headers: {
                            Authorization:
                              `Bearer ${token}`
                          }
                        }

                      );

                      fetchPayments();

                    } catch (err) {

                      console.log(err);

                    }

                  }}

                  className={`px-5 py-3 rounded-2xl font-bold transition ${
                    payment.status ===
                    "pending"
                      ? "bg-red-500/20 hover:bg-red-500/30 text-red-400"
                      : "bg-gray-500/20 text-gray-500 cursor-not-allowed"
                  }`}

                >

                  Reject ❌

                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}

export default AdminPayments;