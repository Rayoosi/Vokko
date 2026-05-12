import {
  useState
} from "react";

import toast from "react-hot-toast";

function WithdrawPage({
  points,
  api
}) {

  const [amount, setAmount] =
    useState("");

  const [walletAddress, setWalletAddress] =
    useState("");

  const submitWithdraw =
    async () => {

      try {

        const token =
          localStorage.getItem("token");

        await api.post(
  "/withdrawals",
          {
            amount,
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
      }
    };

  return (

    <div className="text-white">

      {/* HEADER */}

      <div className="mb-10">

        <h1 className="text-5xl font-black">

          Withdraw 💸

        </h1>

        <p className="text-slate-400 mt-3 text-xl">

          Request a payout from your reward balance.

        </p>

      </div>

      {/* TOP CARD */}

      <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 mb-8">

        <p className="text-slate-400 text-lg">

          Available Balance

        </p>

        <h2 className="text-6xl font-black text-green-400 mt-4">

          {points}

        </h2>

        <p className="text-slate-400 mt-3">

          Reward Points

        </p>

      </div>

      {/* FORM */}

      <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8">

        <h2 className="text-3xl font-black">

          Create Withdraw Request

        </h2>

        <p className="text-slate-400 mt-3 text-lg">

          Enter your payout details below.

        </p>

        {/* AMOUNT */}

        <div className="mt-8">

          <p className="text-slate-400 text-sm">

            Amount

          </p>

          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) =>
              setAmount(
                e.target.value
              )
            }
            className="w-full mt-3 p-5 rounded-2xl bg-black/30 border border-white/10 outline-none text-white placeholder:text-slate-500 focus:border-cyan-400 transition"
          />

        </div>

        {/* WALLET */}

        <div className="mt-6">

          <p className="text-slate-400 text-sm">

            Wallet Address

          </p>

          <input
            type="text"
            placeholder="Enter wallet address"
            value={walletAddress}
            onChange={(e) =>
              setWalletAddress(
                e.target.value
              )
            }
            className="w-full mt-3 p-5 rounded-2xl bg-black/30 border border-white/10 outline-none text-white placeholder:text-slate-500 focus:border-cyan-400 transition"
          />

        </div>

        {/* BUTTON */}

        <button
          onClick={submitWithdraw}
          className="mt-10 bg-gradient-to-r from-cyan-400 to-purple-500 hover:scale-105 transition duration-300 text-white font-bold px-10 py-5 rounded-2xl text-lg shadow-2xl"
        >

          Submit Request 🚀

        </button>

      </div>

    </div>
  );
}

export default WithdrawPage;