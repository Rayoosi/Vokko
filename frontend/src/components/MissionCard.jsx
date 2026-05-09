import { useState } from "react";

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

          setShowAd(false);

        } catch (err) {

          console.log(err);

          setShowAd(false);
        }
      }

    }, 1000);
  };

  /* ---------------- REWARD DISPLAY ---------------- */

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

      {/* WELCOME */}

      <div className="mb-6">

        <h1 className="text-5xl font-bold text-white">
          Missions 🎯
        </h1>

        <p className="text-slate-400 mt-2 text-lg">
          Welcome back, {user?.username || "User"} 👋
        </p>

      </div>

      {/* STATS */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

        <div className="bg-slate-800 rounded-2xl p-5">

          <p className="text-slate-400 text-sm">
            Total Points
          </p>

          <h2 className="text-3xl font-bold text-yellow-400 mt-2">
            {points}
          </h2>

        </div>

        <div className="bg-slate-800 rounded-2xl p-5">

          <p className="text-slate-400 text-sm">
            Mission Progress
          </p>

          <h2 className="text-3xl font-bold text-cyan-400 mt-2">
            {mission.ads_watched}/7
          </h2>

        </div>

        <div className="bg-slate-800 rounded-2xl p-5">

          <p className="text-slate-400 text-sm">
            Status
          </p>

          <h2 className="text-3xl font-bold text-green-400 mt-2">
            {mission.completed ? "Done" : "Active"}
          </h2>

        </div>

        <div className="bg-slate-800 rounded-2xl p-5">

          <p className="text-slate-400 text-sm">
            Reward
          </p>

          <h2 className="text-3xl font-bold text-pink-400 mt-2">
            {rewardDisplay}
          </h2>

        </div>

      </div>

      {/* DAILY ADS MISSION */}

      <div className="bg-slate-800 rounded-2xl p-6">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold">
              Daily Ads Mission 🎯
            </h2>

            <p className="text-slate-400 mt-2">
              Watch 7 ads to earn rewards
            </p>

          </div>

          <div>

            {mission.completed ? (

              <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-lg">
                Completed ✅
              </span>

            ) : (

              <span className="bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-lg">
                In Progress
              </span>

            )}

          </div>

        </div>

        {/* PROGRESS BAR */}

        <div className="w-full bg-slate-700 h-4 rounded-full mt-6 overflow-hidden">

          <div
            className="bg-green-500 h-4 transition-all duration-500"
            style={{
              width:
                `${(mission.ads_watched / 7) * 100}%`
            }}
          />

        </div>

        {/* INFO */}

        <div className="flex items-center justify-between mt-4">

          <p className="text-slate-400">
            Ads Watched: {mission.ads_watched} / 7
          </p>

          <p className="text-yellow-400 font-bold">
            {points} {points === 1 ? "Point" : "Points"}
          </p>

        </div>

        {/* BUTTON */}

        {!mission.completed && (

          <button
            onClick={watchAd}
            className="mt-6 bg-yellow-500 hover:bg-yellow-400 hover:scale-105 transition duration-300 text-black font-bold px-6 py-3 rounded-xl"
          >
            Watch Ad 📺
          </button>

        )}

      </div>

      {/* REFERRAL MISSION */}

      <div className="bg-slate-800 rounded-2xl p-6 mt-6">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold">
              Invite Friends 👥
            </h2>

            <p className="text-slate-400 mt-2">
              Invite 1 friend to earn bonus rewards
            </p>

          </div>

          <span className="bg-cyan-500/20 text-cyan-400 px-4 py-2 rounded-lg">
            +20 Points
          </span>

        </div>

        <button
          className="mt-6 bg-cyan-500 hover:bg-cyan-400 hover:scale-105 transition duration-300 text-black font-bold px-6 py-3 rounded-xl"
        >
          Invite Friends 🚀
        </button>

      </div>

      {/* MODAL */}

      {showAd && (

        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

          <div className="bg-slate-900 p-10 rounded-2xl text-center border border-slate-700 w-[350px]">

            <h2 className="text-3xl font-bold">
              Watching Ad 📺
            </h2>

            <p className="text-slate-400 mt-4">
              Please wait...
            </p>

            <div className="text-7xl font-bold text-yellow-400 mt-8">

              {countdown}

            </div>

          </div>

        </div>

      )}

    </>

  );
}

export default MissionCard;