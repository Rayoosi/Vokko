import { useEffect, useState } from "react";
import axios from "axios";

export default function VipPage() {

  const api = axios.create({
    baseURL: "https://vokko-production.up.railway.app"
  });

  const [user, setUser] =
    useState(null);

  const [points, setPoints] =
    useState(0);

  /* ---------------- LOAD USER ---------------- */

  useEffect(() => {

    const loadUser =
      async () => {

        try {

          const token =
            localStorage.getItem("token");

          const res =
            await api.get(
              "/users/me",
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`
                }
              }
            );

          setUser(res.data.user);

          setPoints(
            res.data.points
          );

        } catch (err) {

          console.log(err);
        }
      };

    loadUser();

  }, []);

  /* ---------------- VIP DATA ---------------- */

  const vipPlans = [
    {
      name: "VIP 1",
      price: "7 USDT",
      reward: "1 point/day",
      border: "border-yellow-500"
    },
    {
      name: "VIP 2",
      price: "15 USDT",
      reward: "2.5 points/day",
      border: "border-green-500"
    },
    {
      name: "VIP 3",
      price: "30 USDT",
      reward: "4.9 points/day",
      border: "border-blue-500"
    },
    {
      name: "VIP 4",
      price: "50 USDT",
      reward: "8.2 points/day",
      border: "border-purple-500"
    }
  ];

  /* ---------------- COPY WALLET ---------------- */

  const copyWallet = () => {

    navigator.clipboard.writeText(
      "TCikcY8GnuqZKJEaD7yuc2VYBVJMRJ4vDW"
    );

    alert("Wallet copied ✅");
  };

  return (

    <div className="min-h-screen bg-[#020b2d] text-white">

      <main className="p-6">

        {/* HEADER */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-6">

          <div>

            <h1 className="text-3xl font-black mb-2">
              VIP Plans 👑
            </h1>

            <p className="text-slate-400 text-base">
              Upgrade your account and earn more daily rewards
            </p>

          </div>

          {/* USER CARD */}

          <div className="bg-slate-800 border border-slate-700 rounded-3xl px-6 py-5 min-w-[280px]">

            <p className="text-slate-400 text-sm">
              Username
            </p>

            <h2 className="text-2xl font-black mt-1">
              {user?.username || "Loading..."}
            </h2>

            <div className="mt-4">

              <p className="text-slate-400 text-sm">
                Current VIP
              </p>

              <div className="text-yellow-400 text-2xl font-black mt-1">
                {user?.vip_level || "FREE"}
              </div>

            </div>

            <div className="mt-4">

              <p className="text-slate-400 text-sm">
                Total Points
              </p>

              <div className="text-green-400 text-2xl font-black mt-1">
                {points}
              </div>

            </div>

          </div>

        </div>

        {/* VIP CARDS */}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          {vipPlans.map((plan) => (

            <div
              key={plan.name}
              className={`bg-slate-800/70 border ${plan.border} rounded-3xl p-6`}
            >

              <h2 className="text-3xl font-black mb-6">
                {plan.name}
              </h2>

              <div className="space-y-6">

                <div>

                  <p className="text-slate-400 text-base">
                    Price
                  </p>

                  <h3 className="text-4xl font-black text-green-400 mt-2">
                    {plan.price}
                  </h3>

                </div>

                <div>

                  <p className="text-slate-400 text-base">
                    Daily Reward
                  </p>

                  <h4 className="text-3xl font-black mt-2">
                    {plan.reward}
                  </h4>

                </div>

              </div>

              <button
                type="button"
                disabled={
                  user?.vip_level === plan.name
                }
                className={`w-full mt-8 font-bold py-4 rounded-2xl text-lg transition ${
                  user?.vip_level === plan.name
                    ? "bg-slate-700 cursor-not-allowed"
                    : "bg-yellow-500 hover:bg-yellow-400 text-black"
                }`}
              >
                {
                  user?.vip_level === plan.name
                    ? "Current Plan"
                    : "Manual Payment"
                }
              </button>

            </div>

          ))}

        </div>

        {/* USDT PAYMENT */}

        <div className="bg-slate-800 border border-yellow-500 rounded-3xl p-8 mt-10">

          <h2 className="text-4xl font-black text-yellow-400 mb-4">
            Pay with USDT (TRC20)
          </h2>

          <p className="text-slate-300 text-lg">
            Send your payment to this wallet address:
          </p>

          <div className="bg-slate-900 mt-6 p-5 rounded-2xl break-all text-green-400 font-black text-xl">

            TCikcY8GnuqZKJEaD7yuc2VYBVJMRJ4vDW

          </div>

          <button
            onClick={copyWallet}
            className="mt-6 bg-yellow-500 hover:bg-yellow-400 text-black font-black px-6 py-3 rounded-2xl transition"
          >
            Copy Wallet 📋
          </button>

          <p className="text-slate-500 mt-6">
            After payment contact admin with transaction screenshot.
          </p>

        </div>

      </main>

    </div>
  );
}