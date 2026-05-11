import {
  Link,
  useLocation
} from "react-router-dom";

function Sidebar({
  user,
  setUser
}) {

  const location =
    useLocation();

  const logout = () => {

    localStorage.removeItem(
      "token"
    );

    setUser(null);

    window.location.href = "/";
  };

  const menu = [

    {
      name: "Dashboard",
      path: "/",
      icon: "🏠"
    },

    {
      name: "Profile",
      path: "/profile",
      icon: "👤"
    },

    {
      name: "Missions",
      path: "/missions",
      icon: "🎯"
    },

    {
      name: "Withdraw",
      path: "/withdraw",
      icon: "💸"
    },

    {
      name: "History",
      path: "/history",
      icon: "📜"
    },

    {
      name: "VIP Plans",
      path: "/vip",
      icon: "👑"
    },

    ...(user?.role === "admin"
      ? [{
          name: "Admin",
          path: "/admin",
          icon: "🛠️"
        }]
      : [])

  ];

  return (

    <div className="w-full md:w-[280px] min-h-screen bg-white/5 backdrop-blur-2xl border-r border-white/10 flex flex-col justify-between p-5">

      {/* TOP */}

      <div>

        {/* LOGO */}

        <div className="flex items-center gap-4 mb-10">

          <div className="w-14 h-14 rounded-3xl bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center text-2xl font-black text-white shadow-2xl">

            V

          </div>

          <div>

            <h1 className="text-3xl font-black text-white">

              Vokko

            </h1>

            <p className="text-slate-400 text-sm">

              Rewards Platform

            </p>

          </div>

        </div>

        {/* USER */}

        <div className="bg-white/5 border border-white/10 rounded-3xl p-5 mb-8">

          <p className="text-slate-400 text-sm">

            Logged in as

          </p>

          <h2 className="text-xl font-bold mt-2 text-cyan-400">

            {user?.username}

          </h2>

          <p className="text-sm mt-2 text-purple-400 font-semibold">

            {user?.role}

          </p>

        </div>

        {/* MENU */}

        <div className="space-y-3">

          {menu.map((item) => {

            const active =
              location.pathname ===
              item.path;

            return (

              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition duration-300 font-semibold ${
                  active
                    ? "bg-gradient-to-r from-cyan-400 to-purple-500 text-white shadow-xl scale-[1.02]"
                    : "bg-white/5 border border-white/5 text-slate-300 hover:bg-white/10 hover:border-cyan-400/20 hover:text-white"
                }`}
              >

                <span className="text-xl">

                  {item.icon}

                </span>

                <span>

                  {item.name}

                </span>

              </Link>

            );
          })}

        </div>

      </div>

      {/* LOGOUT */}

      <button
        onClick={logout}
        className="w-full mt-10 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition text-red-400 font-bold py-4 rounded-2xl"
      >

        Logout 🚪

      </button>

    </div>

  );
}

export default Sidebar;