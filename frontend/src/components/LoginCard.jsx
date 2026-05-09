import {
  useState,
  useEffect
} from "react";

import toast from "react-hot-toast";

function LoginCard({
  login,
  api
}) {

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

      /* ---------------- REGISTER ---------------- */

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

      /* ---------------- LOGIN ---------------- */

      await login(
        username,
        password
      );

    } catch (err) {

      console.log(err);

    }
  };

  return (

    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 w-full max-w-md">

      <h2 className="text-4xl font-black">

        {isRegister
          ? "Create Account 🚀"
          : "Welcome Back 👋"}

      </h2>

      <p className="text-slate-400 mt-3">

        {isRegister
          ? "Create your Vokko account"
          : "Login to continue"}

      </p>

      <input
        placeholder="Username"
        value={username}
        onChange={(e) =>
          setUsername(
            e.target.value
          )
        }
        className="w-full mt-8 p-4 rounded-2xl bg-slate-800 border border-slate-700 outline-none text-white"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(
            e.target.value
          )
        }
        className="w-full mt-4 p-4 rounded-2xl bg-slate-800 border border-slate-700 outline-none text-white"
      />

      {isRegister && referralCode && (

        <div className="mt-4 bg-green-500/20 text-green-400 p-3 rounded-2xl">

          Referral:
          {" "}
          {referralCode}

        </div>

      )}

      <button
        onClick={submit}
        className="w-full mt-8 bg-yellow-500 hover:bg-yellow-400 transition text-black font-bold py-4 rounded-2xl text-lg"
      >

        {isRegister
          ? "Create Account"
          : "Login"}

      </button>

      <button
        onClick={() =>
          setIsRegister(
            !isRegister
          )
        }
        className="w-full mt-4 text-slate-400 hover:text-white transition"
      >

        {isRegister
          ? "Already have an account? Login"
          : "Don't have an account? Register"}

      </button>

    </div>

  );
}

export default LoginCard;