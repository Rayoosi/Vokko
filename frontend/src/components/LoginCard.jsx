import {
  useState,
  useEffect
} from "react";

import toast from "react-hot-toast";

function LoginCard({
  login,
  api
}) {

  /* ---------------- STATES ---------------- */

  const [isRegister, setIsRegister] =
    useState(false);

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [referralCode, setReferralCode] =
    useState("");

  /* ---------------- REFERRAL ---------------- */

  useEffect(() => {

    const params =
      new URLSearchParams(
        window.location.search
      );

    const ref =
      params.get("ref");

    if (ref) {

      setReferralCode(ref);

      setIsRegister(true);
    }

  }, []);

  /* ---------------- SUBMIT ---------------- */

  const submit = async () => {

    try {

      /* ---------- REGISTER ---------- */

      if (isRegister) {

        await api.post(
          "/auth/register",
          {
            username,
            password,
            referredBy:
              referralCode
          }
        );

        toast.success(
          "Account created 🚀"
        );

        setIsRegister(false);

        return;
      }

      /* ---------- LOGIN ---------- */

      await login(
        username,
        password
      );

    } catch (err) {

      console.log(err);

      console.log(
        err.response?.data
      );

      toast.error(
        err.response?.data?.error ||
        "Something went wrong"
      );
    }
  };

  return (

    <div className="w-full max-w-md bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl">

      {/* ---------------- TOP ---------------- */}

      <div className="mb-8">

        <div className="w-16 h-16 rounded-3xl bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center text-3xl font-black text-white shadow-xl">

          V

        </div>

        <h2 className="text-4xl font-black mt-6">

          {isRegister
            ? "Create Account 🚀"
            : "Welcome Back 👋"}

        </h2>

        <p className="text-slate-400 mt-3 text-lg">

          {isRegister
            ? "Create your Vokko account"
            : "Login to continue"}

        </p>

      </div>

      {/* ---------------- USERNAME ---------------- */}

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) =>
          setUsername(
            e.target.value
          )
        }
        className="w-full p-4 rounded-2xl bg-black/30 border border-white/10 outline-none text-white placeholder:text-slate-500 focus:border-cyan-400 transition"
      />

      {/* ---------------- PASSWORD ---------------- */}

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(
            e.target.value
          )
        }
        className="w-full mt-4 p-4 rounded-2xl bg-black/30 border border-white/10 outline-none text-white placeholder:text-slate-500 focus:border-cyan-400 transition"
      />

      {/* ---------------- REFERRAL ---------------- */}

      {isRegister && (

        <input
          type="text"
          placeholder="Referral Code (optional)"
          value={referralCode}
          onChange={(e) =>
            setReferralCode(
              e.target.value
            )
          }
          className="w-full mt-4 p-4 rounded-2xl bg-black/30 border border-white/10 outline-none text-white placeholder:text-slate-500 focus:border-cyan-400 transition"
        />

      )}

      {/* ---------------- AUTO REFERRAL ---------------- */}

      {isRegister && referralCode && (

        <div className="mt-4 bg-green-500/10 border border-green-400/20 text-green-400 p-4 rounded-2xl">

          Referral Code:
          {" "}

          <span className="font-bold">

            {referralCode}

          </span>

        </div>

      )}

      {/* ---------------- BUTTON ---------------- */}

      <button
        onClick={submit}
        className="w-full mt-8 bg-gradient-to-r from-cyan-400 to-purple-500 hover:scale-105 transition duration-300 text-white font-bold py-4 rounded-2xl text-lg shadow-xl"
      >

        {isRegister
          ? "Create Account"
          : "Login"}

      </button>

      {/* ---------------- TOGGLE ---------------- */}

      <button
        onClick={() =>
          setIsRegister(
            !isRegister
          )
        }
        className="w-full mt-5 text-slate-400 hover:text-cyan-400 transition"
      >

        {isRegister
          ? "Already have an account? Login"
          : "Don't have an account? Register"}

      </button>

    </div>

  );
}

export default LoginCard;