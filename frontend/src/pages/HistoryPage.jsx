import {
  useEffect,
  useState
} from "react";

function HistoryPage({
  api
}) {

  const [history, setHistory] =
    useState([]);

  /* ---------------- LOAD HISTORY ---------------- */

  useEffect(() => {

    const loadHistory =
      async () => {

      try {

        const token =
          localStorage.getItem("token");

        const res =
          await api.get(
            "/users/points-history",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

        setHistory(res.data);

      } catch (err) {

        console.log(err);
      }
    };

    loadHistory();

  }, []);

  return (

    <div className="text-white">

      {/* HEADER */}

      <div className="mb-10">

        <h1 className="text-5xl font-black">

          History 📜

        </h1>

        <p className="text-slate-400 mt-3 text-xl">

          View all your rewards and transactions.

        </p>

      </div>

      {/* TABLE */}

      <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden">

        {/* HEAD */}

        <div className="grid grid-cols-3 bg-white/5 border-b border-white/10 p-6 font-bold text-slate-300">

          <div>
            Amount
          </div>

          <div>
            Type
          </div>

          <div>
            Date
          </div>

        </div>

        {/* DATA */}

        {history.length === 0 ? (

          <div className="p-10 text-center text-slate-400 text-lg">

            No transactions found.

          </div>

        ) : (

          history.map((item) => (

            <div
              key={item.id}
              className="grid grid-cols-3 p-6 border-b border-white/5 hover:bg-white/5 transition"
            >

              {/* AMOUNT */}

              <div
                className={`font-bold ${
                  Number(item.amount) >= 0
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >

                {Number(item.amount) >= 0
                  ? "+"
                  : ""}

                {item.amount}

              </div>

              {/* TYPE */}

              <div className="text-cyan-400 font-semibold">

                {item.type || "Reward"}

              </div>

              {/* DATE */}

              <div className="text-slate-400">

                {new Date(
                  item.created_at
                ).toLocaleDateString()}

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  );
}

export default HistoryPage;