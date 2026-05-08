import {
  useState,
  useEffect
} from "react";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import {
  Toaster
} from "react-hot-toast";

import toast from "react-hot-toast";

import api from "./api";

import Sidebar from "./components/Sidebar";
import MissionCard from "./components/MissionCard";

import LandingPage from "./pages/LandingPage";
import SuccessPage from "./pages/SuccessPage";
import CancelPage from "./pages/CancelPage";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import VipPage from "./pages/VipPage";
import WithdrawPage from "./pages/WithdrawPage";
import HistoryPage from "./pages/HistoryPage";
import AdminPage from "./pages/AdminPage";

function App() {

  const [user, setUser] =
    useState(null);

  const [mission, setMission] =
    useState(null);

  const [points, setPoints] =
    useState(0);

  const [loading, setLoading] =
    useState(true);

  /* ---------------- AUTO LOGIN ---------------- */

  useEffect(() => {

    const autoLogin =
      async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        if (!token) {

          setLoading(false);

          return;
        }

        const userRes =
          await api.get(
            "/users/me",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

        setUser(
          userRes.data.user
        );

        setPoints(
          userRes.data.points
        );

        const missionRes =
          await api.get(
            "/missions/daily",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

        setMission(
          missionRes.data
        );

      } catch (err) {

        console.log(err);

        localStorage.removeItem(
          "token"
        );

      } finally {

        setLoading(false);
      }
    };

    autoLogin();

  }, []);

  /* ---------------- LOGIN ---------------- */

  const login = async (
    username,
    password
  ) => {

    try {

      const res =
        await api.post(
          "/auth/login",
          {
            username,
            password
          }
        );

      const token =
        res.data.token;

      localStorage.setItem(
        "token",
        token
      );

      const userRes =
        await api.get(
          "/users/me",
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

      setUser(
        userRes.data.user
      );

      setPoints(
        userRes.data.points
      );

      const missionRes =
        await api.get(
          "/missions/daily",
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

      setMission(
        missionRes.data
      );

      toast.success(
        "Login successful 🚀"
      );

      window.location.href =
        "/";

    } catch (err) {

      console.log(err);

      toast.error(
        "Login failed"
      );
    }
  };

  /* ---------------- LOADING ---------------- */

  if (loading) {

    return (

      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">

        <div className="text-center">

          <h1 className="text-5xl font-bold">
           Vokko 🚀
          </h1>

          <p className="text-slate-400 mt-4 text-lg">
            Loading platform...
          </p>

        </div>

      </div>
    );
  }

  return (

    <BrowserRouter>

      <Toaster position="top-right" />

      {/* PUBLIC ROUTES */}

      {!user ? (

        <Routes>

          <Route
            path="/"
            element={
              <LandingPage
                login={login}
                api={api}
              />
            }
          />

          <Route
            path="/success"
            element={<SuccessPage />}
          />

          <Route
            path="/cancel"
            element={<CancelPage />}
          />

        </Routes>

      ) : (

        <div className="min-h-screen bg-slate-950 text-white flex flex-col md:flex-row">

          <Sidebar
            user={user}
            setUser={setUser}
          />

          <div className="flex-1 p-4 md:p-8">

            <Routes>

              <Route
                path="/"
                element={
                  <div>

                    <DashboardPage
                      user={user}
                      points={points}
                    />

                    {mission && (

                      <MissionCard
                        mission={mission}
                        points={points}
                        setMission={setMission}
                        setPoints={setPoints}
                        api={api}
                      />

                    )}

                  </div>
                }
              />

              <Route
                path="/profile"
                element={
                  <ProfilePage
                    api={api}
                  />
                }
              />

              <Route
                path="/missions"
                element={
                  <div>

                    <h1 className="text-4xl font-bold">
                      Missions 🎯
                    </h1>

                    {mission && (

                      <MissionCard
                        mission={mission}
                        points={points}
                        setMission={setMission}
                        setPoints={setPoints}
                        api={api}
                      />

                    )}

                  </div>
                }
              />

              <Route
                path="/withdraw"
                element={
                  <WithdrawPage
                    points={points}
                    api={api}
                  />
                }
              />

              <Route
                path="/history"
                element={
                  <HistoryPage
                    api={api}
                  />
                }
              />

              <Route
                path="/vip"
                element={<VipPage />}
              />

              <Route
                path="/admin"
                element={
                  <AdminPage
                    api={api}
                  />
                }
              />

              <Route
                path="/success"
                element={<SuccessPage />}
              />

              <Route
                path="/cancel"
                element={<CancelPage />}
              />

            </Routes>

          </div>

        </div>

      )}

    </BrowserRouter>

  );
}

export default App;