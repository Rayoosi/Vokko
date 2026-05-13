import {
  Link
} from "react-router-dom";

function DashboardPage({
  user,
  points
}) {

  return (

    <div className="text-white">

      {/* HERO */}

      <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-10">

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">

          {/* LEFT */}

          <div>

            <p className="text-cyan-400 font-bold text-lg">

              Welcome Back 👋

            </p>

            <h1 className="text-6xl font-black mt-4">

              {user?.username}

            </h1>

            <p className="text-slate-400 text-xl mt-5 max-w-2xl leading-relaxed">

              Continue completing missions, inviting referrals,
              and upgrading your VIP level to earn more rewards.

            </p>

            <div className="flex flex-wrap gap-4 mt-8">

              <Link
                to="/missions"
                className="bg-gradient-to-r from-cyan-400 to-purple-500 hover:scale-105 transition duration-300 px-8 py-4 rounded-2xl text-lg font-bold shadow-2xl"
              >

                Start Missions 🎯

              </Link>

              <Link
                to="/vip"
                className="bg-white/5 border border-white/10 hover:bg-white/10 transition px-8 py-4 rounded-2xl text-lg font-bold"
              >

                Upgrade VIP 👑

              </Link>

            </div>

          </div>

          {/* RIGHT */}

          <div className="bg-black/30 border border-white/10 rounded-3xl p-8 min-w-[280px]">

            <p className="text-slate-400 text-lg">

              Total Balance

            </p>

            <h2 className="text-6xl font-black text-green-400 mt-5">

              {points}

            </h2>

            <p className="text-slate-400 mt-3">

              Reward Points

            </p>

            <div className="mt-8 bg-gradient-to-r from-cyan-400 to-purple-500 text-white px-5 py-3 rounded-2xl font-bold text-center shadow-xl">

              {user?.plan || "FREE"}

            </div>

          </div>

        </div>

      </div>

      {/* QUICK STATS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

        {/* VIP */}

        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8">

          <p className="text-slate-400 text-sm">

            VIP Level

          </p>

          <h2 className="text-4xl font-black text-yellow-400 mt-4">

            {user?.plan || "FREE"}

          </h2>

        </div>

        {/* ROLE */}

        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8">

          <p className="text-slate-400 text-sm">

            Account Role

          </p>

          <h2 className="text-4xl font-black text-cyan-400 mt-4">

            {user?.role || "USER"}

          </h2>

        </div>

        {/* POINTS */}

        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8">

          <p className="text-slate-400 text-sm">

            Total Points

          </p>

          <h2 className="text-4xl font-black text-green-400 mt-4">

            {points}

          </h2>

        </div>

      </div>

      {/* QUICK ACTIONS */}

      <div className="mt-10">

        <h2 className="text-4xl font-black">

          Quick Actions ⚡

        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-8">

          <Link
            to="/missions"
            className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 hover:scale-[1.03] transition duration-300"
          >

            <div className="text-5xl">

              🎯

            </div>

            <h3 className="text-2xl font-black mt-5">

              Missions

            </h3>

            <p className="text-slate-400 mt-3">

              Complete daily missions.

            </p>

          </Link>

          <Link
            to="/vip"
            className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 hover:scale-[1.03] transition duration-300"
          >

            <div className="text-5xl">

              👑

            </div>

            <h3 className="text-2xl font-black mt-5">

              VIP Plans

            </h3>

            <p className="text-slate-400 mt-3">

              Upgrade your rewards.

            </p>

          </Link>

          <Link
            to="/withdraw"
            className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 hover:scale-[1.03] transition duration-300"
          >

            <div className="text-5xl">

              💸

            </div>

            <h3 className="text-2xl font-black mt-5">

              Withdraw

            </h3>

            <p className="text-slate-400 mt-3">

              Request your payout.

            </p>

          </Link>

          <Link
            to="/history"
            className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 hover:scale-[1.03] transition duration-300"
          >

            <div className="text-5xl">

              📜

            </div>

            <h3 className="text-2xl font-black mt-5">

              History

            </h3>

            <p className="text-slate-400 mt-3">

              View transactions.

            </p>

          </Link>

        </div>

      </div>

    </div>
  );
}

export default DashboardPage;