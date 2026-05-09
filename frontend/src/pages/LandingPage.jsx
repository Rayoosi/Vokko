import LoginCard from "../components/LoginCard";

export default function LandingPage({
  login,
  api
}) {

  /* ---------------- VIP PURCHASE ---------------- */

  const buyVip = async (plan) => {

    try {

      const token =
        localStorage.getItem("token");

      if (!token) {

        alert("Please login first");

        return;
      }

      const res =
        await api.post(
          "/billing/create-checkout",
          {
            plan
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

      if (res.data.url) {

        window.location.href =
          res.data.url;
      }

    } catch (err) {

      console.log(err);

      alert("Payment error");
    }
  };

  /* ---------------- VIP DATA ---------------- */

  const vipPlans = [
    {
      name: "VIP 1",
      price: "$7",
      reward: "1 point/day"
    },
    {
      name: "VIP 2",
      price: "$15",
      reward: "2.5 points/day"
    },
    {
      name: "VIP 3",
      price: "$30",
      reward: "4.9 points/day"
    },
    {
      name: "VIP 4",
      price: "$50",
      reward: "8.2 points/day"
    }
  ];

  return (

    <div className="min-h-screen bg-gradient-to-br from-[#060816] via-[#0f172a] to-black text-white overflow-x-hidden">

      {/* NAVBAR */}

      <header className="border-b border-white/10 sticky top-0 z-50 backdrop-blur-xl bg-black/20">

        <div className="max-w-7xl mx-auto px-6 md:px-16 py-5 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center text-white font-black shadow-lg">

              V

            </div>

            <div>

              <h1 className="font-black text-2xl">
                Vokko
              </h1>

              <p className="text-slate-400 text-sm">
                Rewards Platform
              </p>

            </div>

          </div>

          <div className="hidden md:flex items-center gap-8 text-slate-300 font-semibold">

            <a
              href="#vip"
              className="hover:text-cyan-400 transition"
            >
              VIP Plans
            </a>

            <a
              href="#referrals"
              className="hover:text-cyan-400 transition"
            >
              Referrals
            </a>

            <a
              href="#auth"
              className="hover:text-cyan-400 transition"
            >
              Login
            </a>

          </div>

        </div>

      </header>

      {/* HERO */}

      <section className="px-6 md:px-16 py-24 border-b border-white/10">

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">

          <div>

            <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-400/20 text-cyan-400 px-4 py-2 rounded-full text-sm font-semibold mb-8">

              Vokko Rewards Platform 🚀

            </div>

            <h1 className="text-5xl md:text-7xl font-black leading-tight">

              Earn Daily Rewards

              <span className="text-cyan-400 block mt-2 drop-shadow-[0_0_15px_rgba(34,211,238,0.7)]">

                With VIP Plans

              </span>

            </h1>

            <p className="text-slate-400 text-lg md:text-xl mt-8 leading-relaxed max-w-2xl">

              Complete missions, invite referrals, upgrade your VIP level,
              and grow your daily passive rewards inside a modern rewards ecosystem.

            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-10">

              <a
                href="#auth"
                className="bg-gradient-to-r from-cyan-400 to-purple-500 hover:scale-105 transition duration-300 text-white font-bold px-8 py-4 rounded-2xl text-lg text-center shadow-xl"
              >
                Start Earning 🚀
              </a>

              <a
                href="#vip"
                className="bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition px-8 py-4 rounded-2xl text-lg text-center"
              >
                Explore VIP Plans
              </a>

            </div>

          </div>

          {/* RIGHT CARD */}

          <div>

            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl">

              <div className="flex items-center justify-between mb-8">

                <div>

                  <p className="text-slate-400 text-sm">
                    Total Points
                  </p>

                  <h2 className="text-5xl font-black text-cyan-400 mt-2">

                    14,920

                  </h2>

                </div>

                <div className="bg-green-500/20 text-green-400 px-4 py-2 rounded-xl font-bold">

                  VIP 4

                </div>

              </div>

              <div className="space-y-4">

                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center justify-between">

                  <div>

                    <p className="font-bold text-lg">

                      Daily VIP Reward

                    </p>

                    <p className="text-slate-400 mt-1">

                      Automatic daily income

                    </p>

                  </div>

                  <div className="text-green-400 text-2xl font-black">

                    +8.2

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* VIP SECTION */}

      <section
        id="vip"
        className="px-6 md:px-16 py-24"
      >

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-16">

            <h2 className="text-5xl font-black">
              VIP Plans 👑
            </h2>

            <p className="text-slate-400 text-xl mt-6 max-w-2xl mx-auto">

              Upgrade your account and unlock higher passive daily rewards.

            </p>

          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">

            {vipPlans.map((plan) => (

              <div
                key={plan.name}
                className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 hover:border-cyan-400/40 transition duration-300"
              >

                <div className="flex items-center justify-between">

                  <h3 className="text-3xl font-black">
                    {plan.name}
                  </h3>

                  <div className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-xl text-sm font-bold">

                    ACTIVE

                  </div>

                </div>

                <div className="mt-10">

                  <p className="text-slate-400 text-lg">
                    Price
                  </p>

                  <h4 className="text-5xl font-black mt-3 text-cyan-400">

                    {plan.price}

                  </h4>

                </div>

                <div className="mt-10 bg-white/5 border border-white/10 rounded-2xl p-5">

                  <p className="text-slate-400">

                    Daily Reward

                  </p>

                  <h5 className="text-3xl font-black mt-2 text-green-400">

                    {plan.reward}

                  </h5>

                </div>

                <button
                  type="button"
                  onClick={() =>
                    buyVip(plan.name)
                  }
                  className="w-full mt-10 bg-gradient-to-r from-cyan-400 to-purple-500 hover:scale-105 transition duration-300 text-white font-bold py-4 rounded-2xl text-lg cursor-pointer"
                >

                  Upgrade 🚀

                </button>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* AUTH */}

      <section
        id="auth"
        className="px-6 md:px-16 py-24 border-t border-white/10"
      >

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">

          <div>

            <h2 className="text-5xl font-black leading-tight">

              Ready To Start?

              <span className="text-cyan-400 block mt-2">

                Create Your Account 🚀

              </span>

            </h2>

            <p className="text-slate-400 text-xl mt-8 leading-relaxed">

              Login or create your account and start earning rewards through VIP plans, referrals, and daily missions.

            </p>

          </div>

          <div className="flex justify-center">

            <LoginCard
              login={login}
              api={api}
            />

          </div>

        </div>

      </section>

    </div>

  );
}