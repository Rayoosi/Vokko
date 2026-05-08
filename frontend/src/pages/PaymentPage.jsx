export default function PaymentPage() {

  const wallet =
    "TCikcY8GnuqZKJEaD7yuc2VYBVJMRJ4vDW";

  const copyWallet = () => {

    navigator.clipboard.writeText(
      wallet
    );

    alert(
      "Wallet copied ✅"
    );
  };

  return (

    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-2xl w-full">

        <h1 className="text-4xl font-black text-yellow-400">
          Manual Payment 💳
        </h1>

        <p className="text-slate-400 mt-4 text-lg">
          Send USDT (TRC20) to the wallet below.
        </p>

        <div className="bg-slate-800 mt-8 p-5 rounded-2xl break-all text-green-400 font-black text-xl">

          {wallet}

        </div>

        <button
          onClick={copyWallet}
          className="w-full mt-6 bg-yellow-500 hover:bg-yellow-400 text-black font-black py-4 rounded-2xl transition"
        >
          Copy Wallet 📋
        </button>

        <div className="mt-8 bg-slate-800 rounded-2xl p-5">

          <h2 className="text-2xl font-black">
            Instructions
          </h2>

          <ul className="mt-4 space-y-3 text-slate-300">

            <li>
              • Send the exact amount for your VIP plan
            </li>

            <li>
              • Network must be TRC20
            </li>

            <li>
              • Save payment screenshot
            </li>

            <li>
              • Contact admin after payment
            </li>

          </ul>

        </div>

      </div>

    </div>
  );
}