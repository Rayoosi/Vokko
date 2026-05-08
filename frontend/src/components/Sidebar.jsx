import { Link } from "react-router-dom";

function Sidebar({
  user,
  setUser
}) {

  return (

    <div className="w-full md:w-64 bg-slate-900 border-r border-slate-800 md:min-h-screen p-6 flex flex-col justify-between">

      <div>

        <h1 className="text-3xl font-bold text-white mb-10">
          Vokko 🚀
        </h1>

        <nav className="flex flex-col gap-4">

          <Link
            to="/"
            className="bg-slate-800 hover:bg-slate-700 transition p-4 rounded-xl text-white"
          >
            Dashboard
          </Link>

          <Link
            to="/profile"
            className="bg-slate-800 hover:bg-slate-700 transition p-4 rounded-xl text-white"
          >
            Profile
          </Link>

          <Link
            to="/missions"
            className="bg-slate-800 hover:bg-slate-700 transition p-4 rounded-xl text-white"
          >
            Missions
          </Link>

          <Link
            to="/withdraw"
            className="bg-slate-800 hover:bg-slate-700 transition p-4 rounded-xl text-white"
          >
            Withdraw
          </Link>

          <Link
            to="/history"
            className="bg-slate-800 hover:bg-slate-700 transition p-4 rounded-xl text-white"
          >
            History
          </Link>

          <Link
            to="/vip"
            className="bg-slate-800 hover:bg-slate-700 transition p-4 rounded-xl text-white"
          >
            VIP Plans
          </Link>

          {user.role === "admin" && (

            <Link
              to="/admin"
              className="bg-red-500 hover:bg-red-400 transition p-4 rounded-xl text-white font-bold"
            >
              Admin 👑
            </Link>

          )}

        </nav>

      </div>

      {/* LOGOUT */}

      <button
        onClick={() => {

          localStorage.removeItem(
            "token"
          );

          setUser(null);
        }}
        className="mt-8 bg-slate-700 hover:bg-slate-600 transition p-4 rounded-xl text-white font-bold"
      >
        Logout 🚪
      </button>

    </div>

  );
}

export default Sidebar;