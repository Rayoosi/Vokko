import {
  useState
} from "react";

import toast from "react-hot-toast";

function WithdrawPage({
  points,
  api
}) {

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
            wallet_address:
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

          Your full balance will be withdrawn automatically.

        </p>

        {/* WALLET */}

        <div className="mt-8">

          <p className="text-slate-400 text-sm">

            Wallet Address

          </p>

          <input
            type="text"
            placeholder="Enter your USDT wallet"
            value={walletAddress}
            onChange={(e) =>
              setWalletAddress(
                e.target.value
              )
            }
            className="w-full mt-3 p-5 rounded-2xl bg-black/30 border border-white/10 outline-none text-white placeholder:text-slate-500 focus:border-cyan-400 transition"
          />

        </div>

        {/* INFO BOX */}

        <div className="mt-6 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-5">

          <p className="text-yellow-400 font-bold text-lg">

            Withdraw Rules

          </p>

          <ul className="mt-3 text-slate-300 space-y-2 text-sm">

            <li>
              • Minimum withdraw is 100 points
            </li>

            <li>
              • 100 points = $10
            </li>

            <li>
              • You must invite 3 paid referrals
            </li>

            <li>
              • One referral must match your VIP level
            </li>

          </ul>

        </div>

        {/* BUTTON */}

        <button
          onClick={submitWithdraw}
          className="w-full mt-8 bg-gradient-to-r from-cyan-400 to-purple-500 hover:scale-105 transition duration-300 text-white font-bold py-5 rounded-2xl text-lg shadow-2xl"
        >

          Submit Withdraw Request 🚀

        </button>

      </div>

    </div>

  );

}

export default WithdrawPage;