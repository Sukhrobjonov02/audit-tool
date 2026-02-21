export const calculateFunnel = (revenueGoal, avgCheck, conversionRate) => {
  const targetLeads = revenueGoal / avgCheck / (conversionRate / 100);
  return Math.ceil(targetLeads);
};

export const calculateBudget = (leads, platform, hasCRM, hasSalesTeam) => {
  // Benchmark CPL based on platform
  let baseCPL = 1.0;
  if (platform === 'Instagram') baseCPL = 1.15; // Average of 0.8 to 1.5
  else if (platform === 'Facebook') baseCPL = 0.9;
  else if (platform === 'Google') baseCPL = 2.5;
  else if (platform === 'TikTok') baseCPL = 0.7;

  let penaltyMultiplier = 1.0;
  let missingCrmPenalty = 0;
  let missingSalesTeamPenalty = 0;

  if (!hasCRM) {
    penaltyMultiplier += 0.2;
    missingCrmPenalty = 0.2;
  }
  if (!hasSalesTeam) {
    penaltyMultiplier += 0.2;
    missingSalesTeamPenalty = 0.2;
  }

  const optimalBudgetOrig = leads * baseCPL;
  const totalCost = optimalBudgetOrig * penaltyMultiplier;
  const lossAmount = totalCost - optimalBudgetOrig;

  return {
    baseCPL,
    optimalBudget: Math.ceil(totalCost),
    cleanBudget: Math.ceil(optimalBudgetOrig),
    lossAmount: Math.ceil(lossAmount),
    missingCrmPenalty,
    missingSalesTeamPenalty,
    penaltyPercentage: Math.round((penaltyMultiplier - 1.0) * 100)
  };
};

export const calculateHealthScore = (hasCRM, hasSalesTeam, conversionRate) => {
  let score = 100;
  if (!hasCRM) score -= 30;
  if (!hasSalesTeam) score -= 30;
  if (conversionRate < 20) score -= 20;
  else if (conversionRate < 40) score -= 10;
  return score;
};
