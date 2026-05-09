import { useState } from "react";

import toast from "react-hot-toast";

function MissionCard({
  mission,
  points,
  setMission,
  setPoints,
  api,
  user
}) {

  const [showAd, setShowAd] =
    useState(false);

  const [countdown, setCountdown] =
    useState(5);

  const watchAd = async () => {

    setShowAd(true);

    /* ---------------- OPEN REAL AD ---------------- */

    window.open(
      "https://omg10.com/4/10986551",
      "_blank"
    );

    let timer = 5;

    setCountdown(timer);

    const interval = setInterval(async () => {

      timer--;

      setCountdown(timer);

      if (timer <= 0) {

        clearInterval(interval);

        try {

          const token =
            localStorage.getItem("token");

          await api.post(
            "/missions/watch-ad",
            {},
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

          const updatedMission =
            await api.get(
              "/missions/daily",
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`
                }
              }
            );

          setMission(updatedMission.data);

          const updatedUser =
            await api.get(
              "/users/me",
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`
                }
              }
            );

          setPoints(updatedUser.data.points);

          toast.success(
            "Mission completed 🎉"
          );

          setShowAd(false);

        } catch (err) {

          console.log(err);

          toast.error(
            "Something went wrong"
          );

          setShowAd(false);
        }
      }

    }, 1000);
  };

  const rewards = {
    free: "+3",
    starter: "+5",
    pro: "+8",
    elite: "+12"
  };

  const rewardDisplay =
    rewards[user?.plan] || "+3";

  return (

    <>

      {/* HEADER */}

      <div className="mb-8">

        <h1 className="text-5xl font-black text-white">

          Missions 🎯

        </h1>

        <p className="text-slate-400 mt-3 text-lg">

          Welcome back,
          {" "}
          <span className="text-cyan-400 font-bold">

            {user?.username || "User"}

          </span>

        </p>

      </div>

      {/* STATS */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">

        {/* POINTS */}

        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6">

          <p className="text-slate-400 text-sm">

            Total Points

          </p>

          <h2 className="text-4xl font-black text-yellow-400 mt-3">

            {points}

          </h2>

        </div>

        {/* PROGRESS */}

        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6">

          <p className="text-slate-400 text-sm">

            Mission Progress

          </p>

          <h2 className="text-4xl font-black text-cyan-400 mt-3">

            {mission.ads_watched}/7

          </h2>

        </div>

        {/* STREAK */}

        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6">

          <p className="text-slate-400 text-sm">

            Daily Streak

          </p>

          <h2 className="text-4xl font-black text-pink-400 mt-3">

            {user?.streak || 1}

          </h2>

        </div>

        {/* REWARD */}

        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6">

          <p className="text-slate-400 text-sm">

            Reward

          </p>

          <h2 className="text-4xl font-black text-green-400 mt-3">

            {rewardDisplay}

          </h2>

        </div>

      </div>

      {/* MAIN MISSION */}

      <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8">

        <div className="flex items-center justify-between flex-wrap gap-4">

          <div>

            <h2 className="text-3xl font-black">

              Daily Ads Mission 📺

            </h2>

            <p className="text-slate-400 mt-3 text-lg">

              Watch 7 ads and collect rewards.

            </p>

          </div>

          <div>

            {mission.completed ? (

              <div className="bg-green-500/20 border border-green-400/20 text-green-400 px-5 py-3 rounded-2xl font-bold">

                Completed ✅

              </div>

            ) : (

              <div className="bg-yellow-500/20 border border-yellow-400/20 text-yellow-400 px-5 py-3 rounded-2xl font-bold">

                In Progress ⏳

              </div>

            )}

          </div>

        </div>

        {/* BAR */}

        <div className="w-full h-5 bg-black/30 rounded-full mt-8 overflow-hidden">

          <div
            className="h-5 bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-500 rounded-full"
            style={{
              width:
                `${(mission.ads_watched / 7) * 100}%`
            }}
          />

        </div>

        {/* INFO */}

        <div className="flex items-center justify-between mt-5 flex-wrap gap-4">

          <p className="text-slate-400 text-lg">

            Ads Watched:
            {" "}
            <span className="text-white font-bold">

              {mission.ads_watched}/7

            </span>

          </p>

          <p className="text-yellow-400 font-bold text-lg">

            {points}
            {" "}
            Points

          </p>

        </div>

        {/* BUTTON */}

        {!mission.completed && (

          <button
            onClick={watchAd}
            className="mt-8 bg-gradient-to-r from-cyan-400 to-purple-500 hover:scale-105 transition duration-300 text-white font-bold px-8 py-4 rounded-2xl text-lg shadow-2xl"
          >

            Watch Ad 📺

          </button>

        )}

      </div>

      {/* REFERRAL */}

      <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 mt-8">

        <div className="flex items-center justify-between flex-wrap gap-4">

          <div>

            <h2 className="text-3xl font-black">

              Invite Friends 👥

            </h2>

            <p className="text-slate-400 mt-3 text-lg">

              Share your referral link and earn bonus rewards.

            </p>

          </div>

          <div className="bg-cyan-500/20 border border-cyan-400/20 text-cyan-400 px-5 py-3 rounded-2xl font-bold">

            +20 Points

          </div>

        </div>

        <button
          onClick={() => {

            const referralLink =
              `https://vokko-tawny.vercel.app/?ref=${user.referral_code}`;

            navigator.clipboard.writeText(referralLink);

            toast.success(
              "Referral link copied 🚀"
            );
          }}
          className="mt-8 bg-gradient-to-r from-cyan-400 to-purple-500 hover:scale-105 transition duration-300 text-white font-bold px-8 py-4 rounded-2xl text-lg shadow-2xl"
        >

          Invite Friends 🚀

        </button>

      </div>

      {/* MODAL */}

      {showAd && (

        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50">

          <div className="bg-[#0f172a] border border-white/10 rounded-3xl p-10 text-center w-[350px] shadow-2xl">

            <h2 className="text-4xl font-black">

              Watching Ad 📺

            </h2>

            <p className="text-slate-400 mt-4 text-lg">

              Please wait...

            </p>

            <div className="text-8xl font-black text-cyan-400 mt-8">

              {countdown}

            </div>

          </div>

        </div>

      )}

    </>

  );
}

export default MissionCard;