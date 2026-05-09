import {
  useEffect,
  useState
} from "react";

import toast from "react-hot-toast";

function ProfilePage({
  api
}) {

  const [profile, setProfile] =
    useState(null);

  /* ---------------- LOAD PROFILE ---------------- */

  useEffect(() => {

    const loadProfile =
      async () => {

      try {

        const token =
          localStorage.getItem("token");

        const res =
          await api.get(
            "/users/profile",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

        setProfile(res.data);

      } catch (err) {

        console.log(err);
      }
    };

    loadProfile();

  }, []);

  /* ---------------- LOADING ---------------- */

  if (!profile) {

    return (

      <div className="text-white text-2xl">

        Loading profile...

      </div>
    );
  }

  const referralLink =
    `https://vokko-tawny.vercel.app/?ref=${profile.user.referral_code}`;

  return (

    <div className="text-white">

      {/* HEADER */}

      <div className="mb-10">

        <h1 className="text-5xl font-black">

          Profile 👤

        </h1>

        <p className="text-slate-400 mt-3 text-lg">

          Manage your Vokko account and rewards.

        </p>

      </div>

      {/* TOP CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">

        {/* USERNAME */}

        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6">

          <p className="text-slate-400 text-sm">

            Username

          </p>

          <h2 className="text-3xl font-black text-cyan-400 mt-3">

            {profile.user.username}

          </h2>

        </div>

        {/* VIP */}

        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6">

          <p className="text-slate-400 text-sm">

            VIP Level

          </p>

          <h2 className="text-3xl font-black text-yellow-400 mt-3">

            {profile.user.vip_level || "FREE"}

          </h2>

        </div>

        {/* POINTS */}

        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6">

          <p className="text-slate-400 text-sm">

            Total Points

          </p>

          <h2 className="text-3xl font-black text-green-400 mt-3">

            {profile.points}

          </h2>

        </div>

        {/* REFERRALS */}

        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6">

          <p className="text-slate-400 text-sm">

            Total Referrals

          </p>

          <h2 className="text-3xl font-black text-pink-400 mt-3">

            {profile.totalReferrals}

          </h2>

        </div>

      </div>

      {/* REFERRAL SECTION */}

      <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 mt-8">

        <h2 className="text-3xl font-black">

          Referral System 👥

        </h2>

        <p className="text-slate-400 mt-3 text-lg">

          Share your referral link and invite more users.

        </p>

        {/* REF CODE */}

        <div className="mt-8">

          <p className="text-slate-400 text-sm">

            Referral Code

          </p>

          <div className="bg-black/30 border border-white/10 rounded-2xl p-5 mt-3 text-cyan-400 font-bold text-lg break-all">

            {profile.user.referral_code}

          </div>

        </div>

        {/* REF LINK */}

        <div className="mt-6">

          <p className="text-slate-400 text-sm">

            Referral Link

          </p>

          <div className="bg-black/30 border border-white/10 rounded-2xl p-5 mt-3 text-green-400 font-bold break-all">

            {referralLink}

          </div>

        </div>

        {/* BUTTON */}

        <button
          onClick={() => {

            navigator.clipboard.writeText(
              referralLink
            );

            toast.success(
              "Referral link copied 🚀"
            );
          }}
          className="mt-8 bg-gradient-to-r from-cyan-400 to-purple-500 hover:scale-105 transition duration-300 text-white font-bold px-8 py-4 rounded-2xl text-lg shadow-2xl"
        >

          Copy Referral Link 🚀

        </button>

      </div>

    </div>
  );
}

export default ProfilePage;