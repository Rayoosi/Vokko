import { useState } from "react";

function MissionCard({
  mission,
  points,
  setMission,
  setPoints,
  api
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

  return (

    <>

      <div className="bg-slate-800 rounded-2xl p-6 mt-6">

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

        <div className="w-full bg-slate-700 h-4 rounded-full mt-6 overflow-hidden">

          <div
            className="bg-green-500 h-4 transition-all duration-500"
            style={{
              width:
                `${(mission.ads_watched / 7) * 100}%`
            }}
          />

        </div>

        <div className="flex items-center justify-between mt-4">

          <p className="text-slate-400">
            {mission.ads_watched}/7 watched
          </p>

          <p className="text-yellow-400 font-bold">
            {points} points
          </p>

        </div>

        {!mission.completed && (

          <button
            onClick={watchAd}
            className="mt-6 bg-yellow-500 hover:bg-yellow-400 transition text-black font-bold px-6 py-3 rounded-xl"
          >
            Watch Ad 📺
          </button>

        )}

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