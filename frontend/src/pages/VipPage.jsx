import api from "../api";

function VipPage() {

  const buyVip = async () => {

    try {

      const res =
        await api.post(
          "/api/payment/create-checkout-session"
        );

      if (res.data.url) {

        window.location.href =
          res.data.url;
      }

    } catch (err) {

      console.log(err);

      alert("Payment error");
    }
  };

  const plans = [

    {
      name: "VIP 1",
      price: "$999",
      reward: "1 Point / Day",
      color: "from-cyan-400 to-blue-500"
    },

    {
      name: "VIP 2",
      price: "$15",
      reward: "2.5 Points / Day",
      color: "from-purple-400 to-pink-500"
    },

    {
      name: "VIP 3",
      price: "$30",
      reward: "4.9 Points / Day",
      color: "from-yellow-400 to-orange-500"
    },

    {
      name: "VIP 4",
      price: "$50",
      reward: "8.2 Points / Day",
      color: "from-green-400 to-emerald-500"
    }

  ];

  return (

    <div className="text-white">

      {/* HEADER */}

      <div className="mb-12">

        <h1 className="text-5xl font-black">

          VIP Plans 👑

        </h1>

        <p className="text-slate-400 mt-4 text-xl">

          Upgrade your account and unlock passive daily rewards.

        </p>

      </div>

      {/* PLANS */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {plans.map((plan) => (

          <div
            key={plan.name}
            className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 hover:scale-[1.03] hover:border-cyan-400/30 transition duration-300"
          >

            {/* TOP */}

            <div className={`w-20 h-20 rounded-3xl bg-gradient-to-r ${plan.color} flex items-center justify-center text-3xl font-black shadow-2xl`}>

              👑

            </div>

            {/* TITLE */}

            <h2 className="text-4xl font-black mt-8">

              {plan.name}

            </h2>

            <p className="text-slate-400 mt-3 text-lg">

              Passive rewards every day.

            </p>

            {/* PRICE */}

            <div className="mt-10">

              <p className="text-slate-400 text-sm">

                Price

              </p>

              <h3 className="text-5xl font-black text-cyan-400 mt-2">

                {plan.price}

              </h3>

            </div>

            {/* REWARD */}

            <div className="mt-8 bg-black/30 border border-white/10 rounded-2xl p-5">

              <p className="text-slate-400 text-sm">

                Daily Reward

              </p>

              <h4 className="text-3xl font-black text-green-400 mt-3">

                {plan.reward}

              </h4>

            </div>

            {/* BUTTON */}

            <button
              onClick={buyVip}
              className={`w-full mt-10 bg-gradient-to-r ${plan.color} hover:scale-105 transition duration-300 text-white font-bold py-4 rounded-2xl text-lg shadow-2xl`}
            >

              Upgrade 🚀

            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default VipPage;