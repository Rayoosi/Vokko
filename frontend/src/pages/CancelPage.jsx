export default function CancelPage() {

  return (

    <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white px-6">

      <div className="bg-slate-900 border border-red-500 rounded-3xl p-10 max-w-xl w-full text-center shadow-2xl">

        <div className="text-7xl mb-6">
          ❌
        </div>

        <h1 className="text-5xl font-black text-red-400">
          Payment Cancelled
        </h1>

        <p className="text-slate-400 text-lg mt-6 leading-relaxed">
          Your payment was cancelled.
          No money was charged and no VIP upgrade was applied.
        </p>

        <a
          href="/vip"
          className="inline-block mt-10 bg-yellow-500 hover:bg-yellow-400 transition text-black font-bold px-8 py-4 rounded-2xl text-lg"
        >
          Back To VIP Page 🚀
        </a>

      </div>

    </div>
  );
}