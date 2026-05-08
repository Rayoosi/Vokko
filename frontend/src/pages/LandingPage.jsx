import LoginCard from "../components/LoginCard";

export default function LandingPage({
  login,
  api
}) {

  /* ---------------- VIP PURCHASE ---------------- */

  const buyVip = async (plan) => {

    console.log("BUY VIP START");
    console.log("PLAN:", plan);

    try {

      const token =
        localStorage.getItem("token");

      console.log("TOKEN:");
      console.log(token);

      if (!token) {

        console.log("NO TOKEN");

        alert("Please login first");

        return;
      }

      console.log("SENDING REQUEST");

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

      console.log("SERVER RESPONSE:");
      console.log(res.data);

      if (res.data.url) {

        console.log("REDIRECTING");

        window.location.href =
          res.data.url;

      } else {

        console.log("NO URL RECEIVED");
      }

    } catch (err) {

      console.log("VIP ERROR:");
      console.log(err);

      if (err.response) {

        console.log("ERROR DATA:");
        console.log(err.response.data);

        console.log("ERROR STATUS:");
        console.log(err.response.status);
      }

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

    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">

      {/* NAVBAR */}

      <header className="border-b border-slate-800 sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80">

        <div className="max-w-7xl mx-auto px-6 md:px-16 py-5 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-2xl bg-yellow-500 flex items-center justify-center text-black font-black">
              R
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
              className="hover:text-yellow-400 transition"
            >
              VIP Plans
            </a>

            <a
              href="#referrals"
              className="hover:text-yellow-400 transition"
            >
              Referrals
            </a>

            <a
              href="#auth"
              className="hover:text-yellow-400 transition"
            >
              Login
            </a>

          </div>

        </div>

      </header>

      {/* HERO */}

      <section className="px-6 md:px-16 py-20 border-b border-slate-800">

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">

          <div>

            <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 px-4 py-2 rounded-full text-sm font-semibold mb-8">
              Vokko Rewards Platform 🚀
            </div>

            <h1 className="text-5xl md:text-7xl font-black leading-tight">

              Earn Daily Rewards

              <span className="text-yellow-400 block mt-2">
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
                className="bg-yellow-500 hover:bg-yellow-400 transition text-black font-bold px-8 py-4 rounded-2xl text-lg text-center"
              >
                Start Earning 🚀
              </a>

              <a
                href="#vip"
                className="bg-slate-800 hover:bg-slate-700 transition px-8 py-4 rounded-2xl text-lg border border-slate-700 text-center"
              >
                Explore VIP Plans
              </a>

            </div>

          </div>

          {/* RIGHT SIDE */}

          <div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">

              <div className="flex items-center justify-between mb-8">

                <div>

                  <p className="text-slate-400 text-sm">
                    Total Points
                  </p>

                  <h2 className="text-5xl font-black text-yellow-400 mt-2">
                    14,920
                  </h2>

                </div>

                <div className="bg-green-500/20 text-green-400 px-4 py-2 rounded-xl font-bold">
                  VIP 4
                </div>

              </div>

              <div className="space-y-4">

                <div className="bg-slate-800 rounded-2xl p-5 flex items-center justify-between">

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
                className="bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-yellow-500/40 transition duration-300"
              >

                <div className="flex items-center justify-between">

                  <h3 className="text-3xl font-black">
                    {plan.name}
                  </h3>

                  <div className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-xl text-sm font-bold">
                    ACTIVE
                  </div>

                </div>

                <div className="mt-10">

                  <p className="text-slate-400 text-lg">
                    Price
                  </p>

                  <h4 className="text-5xl font-black mt-3 text-yellow-400">
                    {plan.price}
                  </h4>

                </div>

                <div className="mt-10 bg-slate-800 rounded-2xl p-5">

                  <p className="text-slate-400">
                    Daily Reward
                  </p>

                  <h5 className="text-3xl font-black mt-2 text-green-400">
                    {plan.reward}
                  </h5>

                </div>

                <button
                  type="button"
                  onClick={() => {

                    console.log("VIP BUTTON CLICKED");

                    buyVip(plan.name);

                  }}
                  className="w-full mt-10 bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-4 rounded-2xl text-lg cursor-pointer"
                >
                  Upgrade 🚀
                </button>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* REFERRALS */}

      <section
        id="referrals"
        className="px-6 md:px-16 py-24 border-t border-slate-800 border-b"
      >

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">

          <div>

            <h2 className="text-5xl font-black leading-tight">

              Invite Friends

              <span className="text-blue-400 block mt-2">
                Earn More Rewards
              </span>

            </h2>

            <p className="text-slate-400 text-xl mt-8 leading-relaxed">
              Share your referral link and receive bonus rewards whenever your invited users upgrade their VIP plans.
            </p>

          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

            <p className="text-slate-400 text-lg">
              Example Referral Link
            </p>

            <div className="bg-slate-800 rounded-2xl p-5 mt-5 break-all text-yellow-400 font-bold">
              https://rayoo.app/?ref=rayoo483
            </div>

          </div>

        </div>

      </section>

      {/* AUTH SECTION */}

      <section
        id="auth"
        className="px-6 md:px-16 py-24 border-t border-slate-800"
      >

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">

          <div>

            <h2 className="text-5xl font-black leading-tight">

              Ready To Start?

              <span className="text-yellow-400 block mt-2">
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