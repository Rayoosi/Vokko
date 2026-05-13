import { useState } from "react";
import api from "../api";

function VipPage() {

  const [paymentData, setPaymentData] =
    useState(null);

  const [txid, setTxid] =
    useState("");

  const buyVip = (plan) => {

    setPaymentData({

      walletAddress:
        "TNr7k7aSxn7JmVxBZikwHe2yFgV2rWxMTf",

      network:
        "TRC20",

      planName:
        plan.name,

      amount:
        plan.price.replace("$", "")

    });

  };

  const confirmPayment = async () => {

    if (!txid) {

      alert(
        "Please enter transaction hash"
      );

      return;

    }

    try {

      await api.post(

        "/api/payment/create-checkout-session",

        {

          planName:
            paymentData.planName,

          amount:
            paymentData.amount,

          txid:
            txid

        }

      );

      alert(
        "Payment request sent successfully"
      );

      setPaymentData(null);

      setTxid("");

    } catch (err) {

      console.log(err);

      alert(
        "Failed to send payment request"
      );

    }

  };

  const plans = [

    {
      name: "VIP 1",
      price: "$999",
      reward: "1 Point / Day",
      color: "from-cyan-400 to-blue-500"
    },

    {
      name: "VIP 2",
      price: "$15",
      reward: "2.5 Points / Day",
      color: "from-purple-400 to-pink-500"
    },

    {
      name: "VIP 3",
      price: "$30",
      reward: "4.9 Points / Day",
      color: "from-yellow-400 to-orange-500"
    },

    {
      name: "VIP 4",
      price: "$50",
      reward: "8.2 Points / Day",
      color: "from-green-400 to-emerald-500"
    }

  ];

  return (

    <div className="text-white">

      {/* HEADER */}

      <div className="mb-12">

        <h1 className="text-5xl font-black">

          VIP Plans 👑

        </h1>

        <p className="text-slate-400 mt-4 text-xl">

          Upgrade your account and unlock passive daily rewards.

        </p>

      </div>

      {/* PLANS */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {plans.map((plan) => (

          <div
            key={plan.name}
            className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 hover:scale-[1.03] hover:border-cyan-400/30 transition duration-300"
          >

            {/* TOP */}

            <div className={`w-20 h-20 rounded-3xl bg-gradient-to-r ${plan.color} flex items-center justify-center text-3xl font-black shadow-2xl`}>

              👑

            </div>

            {/* TITLE */}

            <h2 className="text-4xl font-black mt-8">

              {plan.name}

            </h2>

            <p className="text-slate-400 mt-3 text-lg">

              Passive rewards every day.

            </p>

            {/* PRICE */}

            <div className="mt-10">

              <p className="text-slate-400 text-sm">

                Price

              </p>

              <h3 className="text-5xl font-black text-cyan-400 mt-2">

                {plan.price}

              </h3>

            </div>

            {/* REWARD */}

            <div className="mt-8 bg-black/30 border border-white/10 rounded-2xl p-5">

              <p className="text-slate-400 text-sm">

                Daily Reward

              </p>

              <h4 className="text-3xl font-black text-green-400 mt-3">

                {plan.reward}

              </h4>

            </div>

            {/* BUTTON */}

            <button

              onClick={() => {
                buyVip(plan);
              }}

              className={`w-full mt-10 bg-gradient-to-r ${plan.color} hover:scale-105 transition duration-300 text-white font-bold py-4 rounded-2xl text-lg shadow-2xl`}
            >

              Upgrade 🚀

            </button>

          </div>

        ))}

      </div>

      {/* PAYMENT MODAL */}

      {paymentData && (

        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

          <div className="bg-[#0f172a] border border-cyan-500/20 rounded-3xl p-8 w-[90%] max-w-md text-center">

            <h2 className="text-3xl font-black text-white">

              USDT Payment

            </h2>

            <p className="text-slate-400 mt-4">

              Send exact amount to this wallet

            </p>

            <div className="mt-6 bg-black/40 rounded-2xl p-4 break-all text-cyan-400 font-bold">

              {paymentData.walletAddress}

            </div>

            <button

              onClick={() => {

                navigator.clipboard.writeText(
                  paymentData.walletAddress
                );

              }}

              className="mt-4 bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-6 py-3 rounded-2xl"
            >

              Copy Wallet

            </button>

            <div className="mt-6 text-green-400 font-bold">

              Network: {paymentData.network}

            </div>

            {/* TXID INPUT */}

            <input
              type="text"
              placeholder="Enter Transaction Hash (TXID)"
              value={txid}
              onChange={(e) =>
                setTxid(e.target.value)
              }
              className="w-full mt-6 bg-black/30 border border-white/10 rounded-2xl px-4 py-4 text-white outline-none"
            />

            {/* ARABIC HELP */}

            <p className="text-slate-400 text-sm mt-3 leading-relaxed text-right">

  بعد إرسال عملة USDT
  قم بنسخ رقم العملية
  <span className="text-cyan-400 font-semibold">
    {" "}TXID{" "}
  </span>

  من Binance أو من المحفظة الخاصة بك
  ثم ضعه هنا لإثبات عملية الدفع.

</p>

            <p className="text-yellow-400 text-sm mt-3 leading-relaxed font-semibold text-right">

  ⚠️ لن يتم قبول أي طلب بدون TXID صحيح.

</p>

            <div className="mt-6 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-4">

              <p className="text-yellow-400 font-bold text-lg">

                Selected Plan

              </p>

              <p className="text-slate-300 mt-2">

                Your request for:

              </p>

              <p className="text-white font-black text-2xl mt-2">

                {paymentData.planName}

              </p>

              <p className="text-slate-400 mt-3 text-sm">

                Status: Pending Approval

              </p>

            </div>

            <button

              onClick={confirmPayment}

              className="w-full mt-6 bg-gradient-to-r from-green-500 to-emerald-500 py-4 rounded-2xl font-bold"

            >

              I Have Paid ✅

            </button>

            <button

              onClick={() => {

                setPaymentData(null);
                setTxid("");

              }}

              className="w-full mt-8 bg-gradient-to-r from-purple-500 to-pink-500 py-4 rounded-2xl font-bold"

            >

              Close

            </button>

          </div>

        </div>

      )}

    </div>
  );
}

export default VipPage;