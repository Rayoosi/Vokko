import {
  useEffect,
  useState
} from "react";

function HistoryPage({
  api
}) {

  const [pointsHistory, setPointsHistory] =
    useState([]);

  useEffect(() => {

    const loadHistory =
      async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const pointsRes =
          await api.get(
            "/users/points-history",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

        setPointsHistory(
          pointsRes.data
        );

      } catch (err) {

        console.log(err);
      }
    };

    loadHistory();

  }, []);

  return (

    <div>

      <h1 className="text-4xl font-bold">
        History 📜
      </h1>

      <div className="bg-slate-800 rounded-2xl p-6 mt-8">

        <h2 className="text-2xl font-bold mb-6">
          Points Activity
        </h2>

        <div className="space-y-4">

          {pointsHistory.map((item) => (

            <div
              key={item.id}
              className="bg-slate-900 p-4 rounded-xl flex items-center justify-between"
            >

              <div>

                <p className="font-bold">

                  {item.amount > 0
                    ? "Reward Earned"
                    : "Withdraw"}

                </p>

                <p className="text-slate-400 text-sm">

                  {new Date(
                    item.created_at
                  ).toLocaleString()}

                </p>

              </div>

              <div
                className={
                  item.amount > 0
                    ? "text-green-400 font-bold"
                    : "text-red-400 font-bold"
                }
              >

                {item.amount > 0
                  ? "+"
                  : ""}

                {item.amount}

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  );
}

export default HistoryPage;