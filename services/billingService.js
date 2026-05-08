exports.createSubscription = async (userId, plan) => {
  // future: Stripe integration

  return {
    userId,
    plan,
    status: "active"
  };
};