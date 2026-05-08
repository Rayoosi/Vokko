import {
  useState
} from "react";

import toast from "react-hot-toast";

export default function WithdrawPage({
  points,
  api
}) {

  const [amount, setAmount] =
    useState("");

  const [walletAddress, setWalletAddress] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  /* ---------------- SUBMIT ---------------- */

  const submitWithdraw =
    async () => {

      try {

        setLoading(true);

        const token =
          localStorage.getItem(
            "token"
          );

        await api.post(
          "/users/withdraw",
          {
            amount:
              Number(amount),

            walletAddress
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

        toast.success(
          "Withdraw request submitted 🚀"
        );

        setAmount("");
        setWalletAddress("");

      } catch (err) {

        console.log(err);

        toast.error(
          err.response?.data?.error ||
          "Withdraw failed"
        );

      } finally {

        setLoading(false);
      }
    };

  return (

    <div>

      <h1 className="text-5xl font-black mb-10">
        Withdraw 💸
      </h1>

      <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700 max-w-2xl">

        {/* POINTS */}

        <div className="mb-8">

          <p className="text-slate-400 text-lg">
            Available Points
          </p>

          <h2 className="text-5xl font-black text-yellow-400 mt-3">
            {points}
          </h2>

        </div>

        {/* AMOUNT */}

        <div className="mb-6">

          <p className="text-slate-300 mb-3 text-lg">
            Withdraw Amount
          </p>

          <input
            type="number"
            value={amount}
            onChange={(e) => {
              setAmount(
                e.target.value
              );
            }}
            placeholder="Enter amount"
            className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-5 py-4 text-white outline-none"
          />

        </div>

        {/* WALLET */}

        <div className="mb-8">

          <p className="text-slate-300 mb-3 text-lg">
            Wallet Address
          </p>

          <input
            type="text"
            value={walletAddress}
            onChange={(e) => {
              setWalletAddress(
                e.target.value
              );
            }}
            placeholder="Enter wallet address"
            className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-5 py-4 text-white outline-none"
          />

        </div>

        {/* BUTTON */}

        <button
          onClick={submitWithdraw}
          disabled={loading}
          className="w-full bg-yellow-500 hover:bg-yellow-400 transition text-black font-bold py-4 rounded-2xl text-lg"
        >
          {
            loading
              ? "Processing..."
              : "Submit Withdraw 🚀"
          }
        </button>

      </div>

    </div>
  );
}