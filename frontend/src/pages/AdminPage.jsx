import {
  useEffect,
  useState
} from "react";

export default function AdminPage({
  api
}) {

  const [stats, setStats] =
    useState(null);

  const [withdraws, setWithdraws] =
    useState([]);

  /* ---------------- LOAD DATA ---------------- */

  useEffect(() => {

    const loadData =
      async () => {

        try {

          const token =
            localStorage.getItem(
              "token"
            );

          /* ---------------- STATS ---------------- */

          const res =
            await api.get(
              "/admin/stats",
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`
                }
              }
            );

          setStats(
            res.data
          );

          /* ---------------- WITHDRAWS ---------------- */

          const withdrawRes =
            await api.get(
              "/admin/withdraws",
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`
                }
              }
            );

          setWithdraws(
            withdrawRes.data
          );

        } catch (err) {

          console.log(err);
        }
      };

    loadData();

  }, []);

  /* ---------------- UPDATE WITHDRAW ---------------- */

const updateWithdraw =
  async (id, status) => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      const res =
        await api.put(
          `/admin/withdraws/${id}`,
          {
            status
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

      console.log(res.data);

      /* RELOAD WITHDRAWS */

      const withdrawRes =
        await api.get(
          "/admin/withdraws",
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

      setWithdraws(
        withdrawRes.data
      );

    } catch (err) {

      console.log(err);

      alert(
        err.response?.data?.error ||
        "Update failed"
      );
    }
  };

  /* ---------------- LOADING ---------------- */

  if (!stats) {

    return (

      <div className="text-white text-2xl">
        Loading admin dashboard...
      </div>
    );
  }

  return (

    <div>

      <h1 className="text-5xl font-black mb-10">
        Admin Dashboard 🛠️
      </h1>

      {/* STATS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700">

          <p className="text-slate-400 text-lg">
            Total Users
          </p>

          <h2 className="text-5xl font-black mt-4 text-yellow-400">
            {stats.totalUsers}
          </h2>

        </div>

        <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700">

          <p className="text-slate-400 text-lg">
            Total Payments
          </p>

          <h2 className="text-5xl font-black mt-4 text-green-400">
            {stats.totalPayments}
          </h2>

        </div>

        <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700">

          <p className="text-slate-400 text-lg">
            Total Revenue
          </p>

          <h2 className="text-5xl font-black mt-4 text-blue-400">
            ${stats.totalRevenue}
          </h2>

        </div>

      </div>

      {/* PAYMENTS TABLE */}

      <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700 mt-10 overflow-x-auto">

        <h2 className="text-3xl font-black mb-8">
          Latest Payments 💳
        </h2>

        <table className="w-full">

          <thead>

            <tr className="text-left border-b border-slate-700">

              <th className="pb-4">
                User
              </th>

              <th className="pb-4">
                Plan
              </th>

              <th className="pb-4">
                Amount
              </th>

              <th className="pb-4">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {stats.latestPayments.map(
              (payment) => (

              <tr
                key={payment.id}
                className="border-b border-slate-700/50"
              >

                <td className="py-4">
                  {payment.username}
                </td>

                <td className="py-4 text-yellow-400 font-bold">
                  {payment.plan}
                </td>

                <td className="py-4 text-green-400 font-bold">
                  ${payment.amount}
                </td>

                <td className="py-4">

                  <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-xl text-sm font-bold">

                    {payment.status}

                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* WITHDRAW REQUESTS */}

      <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700 mt-10 overflow-x-auto">

        <h2 className="text-3xl font-black mb-8">
          Withdraw Requests 💸
        </h2>

        <table className="w-full">

          <thead>

            <tr className="text-left border-b border-slate-700">

              <th className="pb-4">
                User
              </th>

              <th className="pb-4">
                Amount
              </th>

              <th className="pb-4">
                Wallet
              </th>

              <th className="pb-4">
                Status
              </th>

              <th className="pb-4">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {withdraws.map(
              (withdraw) => (

              <tr
                key={withdraw.id}
                className="border-b border-slate-700/50"
              >

                <td className="py-4">
                  {withdraw.username}
                </td>

                <td className="py-4 text-yellow-400 font-bold">
                  {withdraw.amount}
                </td>

                <td className="py-4 break-all">
                  {withdraw.wallet_address}
                </td>

                <td className="py-4">

                  <span className={`px-3 py-1 rounded-xl text-sm font-bold ${
                    withdraw.status === "approved"
                      ? "bg-green-500/20 text-green-400"
                      : withdraw.status === "rejected"
                      ? "bg-red-500/20 text-red-400"
                      : "bg-orange-500/20 text-orange-400"
                  }`}>

                    {withdraw.status}

                  </span>

                </td>

                <td className="py-4 flex gap-3">

                  <button
                    disabled={
                      withdraw.status !== "pending"
                    }
                    onClick={() => {
                      updateWithdraw(
                        withdraw.id,
                        "approved"
                      );
                    }}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition ${
                      withdraw.status !== "pending"
                        ? "bg-slate-600 cursor-not-allowed"
                        : "bg-green-500 hover:bg-green-400"
                    }`}
                  >
                    Approve
                  </button>

                  <button
                    disabled={
                      withdraw.status !== "pending"
                    }
                    onClick={() => {
                      updateWithdraw(
                        withdraw.id,
                        "rejected"
                      );
                    }}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition ${
                      withdraw.status !== "pending"
                        ? "bg-slate-600 cursor-not-allowed"
                        : "bg-red-500 hover:bg-red-400"
                    }`}
                  >
                    Reject
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}