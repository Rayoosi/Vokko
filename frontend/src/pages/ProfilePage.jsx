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

  useEffect(() => {

    const loadProfile =
      async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

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

        setProfile(
          res.data
        );

      } catch (err) {

        console.log(err);
      }
    };

    loadProfile();

  }, []);

  if (!profile) {

    return (
      <div>
        Loading...
      </div>
    );
  }

  const referralLink =
    `${window.location.origin}/?ref=${profile.user.referral_code}`;

  return (

    <div>

      <h1 className="text-4xl font-bold">
        Profile 👤
      </h1>

      <div className="bg-slate-800 rounded-2xl p-8 mt-8">

        <div className="space-y-6">

          <div>

            <p className="text-slate-400">
              Username
            </p>

            <h2 className="text-3xl font-bold">
              {profile.user.username}
            </h2>

          </div>

          <div>

            <p className="text-slate-400">
              Current Plan
            </p>

            <h2 className="text-2xl font-bold text-green-400">
              {profile.user.vip_level || "FREE"}
            </h2>

          </div>

          <div>

            <p className="text-slate-400">
              Total Points
            </p>

            <h2 className="text-2xl font-bold text-yellow-400">
              {profile.points}
            </h2>

          </div>

          <div>

            <p className="text-slate-400">
              Referral Code
            </p>

            <h2 className="text-2xl font-bold">
              {profile.user.referral_code}
            </h2>

          </div>

          <div>

            <p className="text-slate-400">
              Referral Link
            </p>

            <div className="bg-slate-900 p-4 rounded-xl mt-2 break-all">

              {referralLink}

            </div>

            <button
              onClick={() => {

                navigator.clipboard.writeText(
                  referralLink
                );

                toast.success(
                  "Referral link copied 🚀"
                );
              }}
              className="mt-4 bg-yellow-500 hover:bg-yellow-400 transition text-black font-bold px-6 py-3 rounded-xl"
            >
              Copy Link 📋
            </button>

          </div>

          <div>

            <p className="text-slate-400">
              Total Referrals
            </p>

            <h2 className="text-2xl font-bold text-blue-400">
              {profile.totalReferrals}
            </h2>

          </div>

        </div>

      </div>

    </div>

  );
}

export default ProfilePage;