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
import PaymentPage from "./pages/PaymentPage";
import AdminPayments from "./pages/AdminPayments";

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

          console.log(userRes.data);

          setUser(
            userRes.data.user
          );

          setPoints(
            userRes.data.points
          );

          try {

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

            console.log(
              "Mission load failed"
            );

          }

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

      console.log(
        "LOGIN RESPONSE:",
        res.data
      );

      const token =
        res.data.token;

      if (!token) {

        toast.error(
          "Token missing"
        );

        return;

      }

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

      console.log(userRes.data);

      setUser(
        userRes.data.user
      );

      setPoints(
        userRes.data.points
      );

      try {

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

        console.log(
          "Mission load failed"
        );

      }

      toast.success(
        "Login successful 🚀"
      );

    } catch (err) {

      console.log(err);

      console.log(
        "LOGIN ERROR:",
        err.response?.data
      );

      toast.error(
        err.response?.data?.error ||
        "Login failed"
      );

    }

  };

  /* ---------------- LOADING ---------------- */

  if (loading) {

    return (

      <div className="min-h-screen bg-gradient-to-br from-[#060816] via-[#0f172a] to-black flex items-center justify-center overflow-hidden relative">

        <div className="absolute w-[400px] h-[400px] bg-cyan-500/20 blur-[120px] rounded-full top-[-100px] left-[-100px]" />

        <div className="absolute w-[400px] h-[400px] bg-purple-500/20 blur-[120px] rounded-full bottom-[-100px] right-[-100px]" />

        <div className="relative z-10 flex flex-col items-center">

          <div className="w-28 h-28 rounded-[32px] bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center text-5xl font-black text-white shadow-[0_0_50px_rgba(34,211,238,0.5)] animate-pulse">

            V

          </div>

          <h1 className="text-6xl font-black text-white mt-8 tracking-tight">

            Vokko

          </h1>

          <p className="text-slate-400 text-xl mt-4">

            Loading platform...

          </p>

        </div>

      </div>

    );

  }

  return (

    <BrowserRouter>

      <Toaster position="top-right" />

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

          <Route
            path="/payment"
            element={<PaymentPage />}
          />

        </Routes>

      ) : (

        <div className="min-h-screen bg-gradient-to-br from-[#060816] via-[#0f172a] to-black text-white flex flex-col md:flex-row">

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
                        user={user}
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

                    {mission && (

                      <MissionCard
                        mission={mission}
                        points={points}
                        setMission={setMission}
                        setPoints={setPoints}
                        api={api}
                        user={user}
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
                path="/payment"
                element={<PaymentPage />}
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
                path="/admin/payments"
                element={
                  <AdminPayments />
                }
              />

            </Routes>

          </div>

        </div>

      )}

    </BrowserRouter>

  );

}

export default App;