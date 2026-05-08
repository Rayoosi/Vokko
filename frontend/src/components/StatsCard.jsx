import { useState } from "react";
import api from "./api";

function App() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useState(null);
  const [mission, setMission] = useState(null);
  const [points, setPoints] = useState(0);

  const login = async () => {

    try {

      const res = await api.post("/auth/login", {
        username,
        password
      });

      const token = res.data.token;

      localStorage.setItem("token", token);

      const userRes = await api.get("/users/me", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setUser(userRes.data.user);
      setPoints(userRes.data.points);

      const missionRes = await api.get(
        "/missions/daily",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setMission(missionRes.data);

    } catch (err) {

      console.log(err);

      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">

      {!user ? (

        <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl w-full max-w-sm shadow-2xl">

          <h1 className="text-3xl font-bold mb-6 text-center">
            SaaS Login 🔐
          </h1>

          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 mb-4 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 mb-4 outline-none"
          />

          <button
            onClick={login}
            className="w-full bg-blue-600 hover:bg-blue-500 transition p-3 rounded-lg font-semibold"
          >
            Login
          </button>

        </div>

      ) : (

        <div className="w-full max-w-2xl">

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">

            <div className="flex items-center justify-between">

              <div>
                <h1 className="text-4xl font-bold">
                  Dashboard 🚀
                </h1>

                <p className="text-slate-400 mt-2">
                  Welcome back, {user.username}
                </p>
              </div>

              <div className="text-right">

                <p className="text-slate-400">
                  Plan
                </p>

                <h2 className="text-2xl font-bold text-green-400 uppercase">
                  {user.plan}
                </h2>

              </div>

            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">

              <div className="bg-slate-800 rounded-xl p-6">

                <p className="text-slate-400">
                  Points
                </p>

                <h2 className="text-4xl font-bold mt-2">
                  {points}
                </h2>

              </div>

              <div className="bg-slate-800 rounded-xl p-6">

                <p className="text-slate-400">
                  Daily Mission
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {mission?.ads_watched || 0}/7
                </h2>

              </div>

            </div>

            {mission && (

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
                    className="bg-green-500 h-4"
                    style={{
                      width: `${(mission.ads_watched / 7) * 100}%`
                    }}
                  />

                </div>

                {!mission.completed && (

                  <button
                    onClick={async () => {

                      try {

                        const token =
                          localStorage.getItem("token");

                        await api.post(
                          "/missions/watch-ad",
                          {},
                          {
                            headers: {
                              Authorization: `Bearer ${token}`
                            }
                          }
                        );

                        const updatedMission =
                          await api.get(
                            "/missions/daily",
                            {
                              headers: {
                                Authorization: `Bearer ${token}`
                              }
                            }
                          );

                        setMission(updatedMission.data);

                        const updatedUser =
                          await api.get(
                            "/users/me",
                            {
                              headers: {
                                Authorization: `Bearer ${token}`
                              }
                            }
                          );

                        setPoints(updatedUser.data.points);

                      } catch (err) {

                        console.log(err);
                      }
                    }}
                    className="mt-6 bg-yellow-500 hover:bg-yellow-400 transition text-black font-bold px-6 py-3 rounded-xl"
                  >
                    Watch Ad 📺
                  </button>

                )}

              </div>

            )}

            {user.plan !== "pro" && (

              <button
                onClick={async () => {

                  try {

                    const token =
                      localStorage.getItem("token");

                    const res = await api.post(
                      "/billing/checkout",
                      {
                        plan: "pro"
                      },
                      {
                        headers: {
                          Authorization: `Bearer ${token}`
                        }
                      }
                    );

                    window.location.href = res.data.url;

                  } catch (err) {

                    console.log(err);

                    alert("Checkout failed");
                  }
                }}
                className="mt-6 w-full bg-green-600 hover:bg-green-500 transition p-4 rounded-xl font-bold text-lg"
              >
                Upgrade to Pro 🚀
              </button>

            )}

            {user.plan === "pro" && (

              <div className="mt-6 bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-center">

                <h2 className="text-green-400 text-2xl font-bold">
                  PRO MEMBER 🔥
                </h2>

              </div>

            )}

          </div>

        </div>

      )}

    </div>
  );
}

export default App;