(function () {
  "use strict";

  const PREMIUM_PLANS = {
    premium_30d: {
      id: "premium_30d",
      title: "اشتراک 1 ماهه",
      days: 30,
      price: 99000,
      currency: "IRT"
    },
    premium_90d: {
      id: "premium_90d",
      title: "اشتراک 3 ماهه",
      days: 90,
      price: 249000,
      currency: "IRT"
    },
    premium_180d: {
      id: "premium_180d",
      title: "اشتراک 6 ماهه",
      days: 180,
      price: 449000,
      currency: "IRT"
    },
    premium_365d: {
      id: "premium_365d",
      title: "اشتراک 1 ساله",
      days: 365,
      price: 799000,
      currency: "IRT"
    }
  };

  function getPremiumPlans() {
    return { ...PREMIUM_PLANS };
  }

  function getPremiumPlan(planId) {
    return PREMIUM_PLANS[planId] || null;
  }

  function startPremiumPurchase(planId) {
    const plan = getPremiumPlan(planId);

    if (!plan) {
      return {
        success: false,
        error: "PLAN_NOT_FOUND"
      };
    }

    return {
      success: true,
      mocked: true,
      purchaseToken: "mock_" + Date.now(),
      planId: plan.id,
      paidAt: Date.now()
    };
  }

  function verifyPremiumPurchase(purchaseResult) {
    if (!purchaseResult || typeof purchaseResult !== "object") {
      return {
        success: false,
        error: "INVALID_PURCHASE_RESULT"
      };
    }

    if (!purchaseResult.success) {
      return {
        success: false,
        error: purchaseResult.error || "PURCHASE_FAILED"
      };
    }

    const plan = getPremiumPlan(purchaseResult.planId);

    if (!plan) {
      return {
        success: false,
        error: "PLAN_NOT_FOUND"
      };
    }

    return {
      success: true,
      verified: true,
      mocked: true,
      planId: plan.id,
      days: plan.days,
      purchaseToken: purchaseResult.purchaseToken || null
    };
  }

  function grantPremiumFromPurchase(planId) {
    const plan = getPremiumPlan(planId);

    if (!plan) {
      return {
        success: false,
        error: "PLAN_NOT_FOUND"
      };
    }

    if (typeof window.activatePremium !== "function") {
      return {
        success: false,
        error: "ACTIVATE_PREMIUM_NOT_AVAILABLE"
      };
    }

    window.activatePremium(plan.days);

    return {
      success: true,
      granted: true,
      planId: plan.id,
      days: plan.days
    };
  }

  function buyPremium(planId) {
    const purchase = startPremiumPurchase(planId);
    if (!purchase.success) return purchase;

    const verification = verifyPremiumPurchase(purchase);
    if (!verification.success) return verification;

    const grant = grantPremiumFromPurchase(verification.planId);
    if (!grant.success) return grant;

    return {
      success: true,
      mocked: true,
      message: "Premium activated successfully",
      planId: verification.planId,
      days: verification.days
    };
  }

  window.getPremiumPlans = getPremiumPlans;
  window.getPremiumPlan = getPremiumPlan;
  window.startPremiumPurchase = startPremiumPurchase;
  window.verifyPremiumPurchase = verifyPremiumPurchase;
  window.grantPremiumFromPurchase = grantPremiumFromPurchase;
  window.buyPremium = buyPremium;
})();
