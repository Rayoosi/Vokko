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

        const res =
          await api.get(
            "/admin/payments"
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

            <div className="flex justify-between items-center">

              <div>

                <h2 className="text-2xl font-black">

                  {payment.username}

                </h2>

                <p className="text-slate-400 mt-2">

                  Plan:
                  {" "}
                  {payment.plan_name}

                </p>

                <p className="text-slate-400">

                  Amount:
                  {" "}
                  ${payment.amount}

                </p>

              </div>

              <div>

                <span className="bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-2xl font-bold">

                  {payment.status}

                </span>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}

export default AdminPayments;