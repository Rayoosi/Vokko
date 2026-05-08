function DashboardPage({
  user,
  points
}) {

  return (

    <div>

      <h1 className="text-4xl font-bold">
        Dashboard 🚀
      </h1>

      <p className="text-slate-400 mt-2">
        Welcome back, {user.username}
      </p>

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
            Plan
          </p>

          <h2 className="text-3xl font-bold mt-2 text-green-400 uppercase">
            {user.plan}
          </h2>

        </div>

      </div>

    </div>

  );
}

export default DashboardPage;