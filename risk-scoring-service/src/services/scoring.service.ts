import { ScoringInput, ScoringResult, ScoringFactor } from '../models/types';

export function calculateEMI(principal: number, annualRate: number, tenureMonths: number): number {
  if (annualRate === 0) return principal / tenureMonths;
  const r = annualRate / 12 / 100;
  return (principal * r * Math.pow(1 + r, tenureMonths)) / (Math.pow(1 + r, tenureMonths) - 1);
}

export function calculateScore(input: ScoringInput): ScoringResult {
  let score = 600;
  const factors: ScoringFactor[] = [];

  // 1. Debt-to-Income Ratio (DTI) — 30% weight (max ±120 points)
  const monthlyIncome = input.annualIncome / 12;
  const proposedEMI = calculateEMI(input.loanAmount, 10, input.loanTenureMonths);
  const totalMonthlyDebt = input.monthlyDebt + proposedEMI;
  const dti = totalMonthlyDebt / monthlyIncome;

  let dtiPoints = 0;
  let dtiImpact: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL' = 'NEUTRAL';
  let dtiDetail = `DTI is ${(dti * 100).toFixed(1)}%`;

  if (dti < 0.3) { dtiPoints = 120; dtiImpact = 'POSITIVE'; dtiDetail += ' (Excellent)'; }
  else if (dti >= 0.3 && dti < 0.4) { dtiPoints = 60; dtiImpact = 'POSITIVE'; dtiDetail += ' (Good)'; }
  else if (dti >= 0.4 && dti <= 0.5) { dtiPoints = 0; dtiImpact = 'NEUTRAL'; dtiDetail += ' (Moderate)'; }
  else { dtiPoints = -100; dtiImpact = 'NEGATIVE'; dtiDetail += ' (High risk)'; }

  score += dtiPoints;
  factors.push({ name: 'Debt-to-Income Ratio', impact: dtiImpact, detail: dtiDetail, points: dtiPoints });

  // 2. Employment Stability — 20% weight (max ±80 points)
  let empPoints = 0;
  let empImpact: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL' = 'NEUTRAL';
  
  if (input.employmentYears >= 5) { empPoints = 80; empImpact = 'POSITIVE'; }
  else if (input.employmentYears >= 2 && input.employmentYears < 5) { empPoints = 40; empImpact = 'POSITIVE'; }
  else { empPoints = -30; empImpact = 'NEGATIVE'; }
  
  score += empPoints;
  factors.push({ name: 'Employment Stability', impact: empImpact, detail: `${input.employmentYears} years employed`, points: empPoints });

  // 3. Employment Type — 10% weight (max ±30 points)
  let typePoints = 0;
  let typeImpact: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL' = 'NEUTRAL';

  if (input.employmentType === 'SALARIED') { typePoints = 30; typeImpact = 'POSITIVE'; }
  else { typePoints = -10; typeImpact = 'NEGATIVE'; }

  score += typePoints;
  factors.push({ name: 'Employment Type', impact: typeImpact, detail: input.employmentType, points: typePoints });

  // 4. Existing Loans — 15% weight (max ±60 points)
  let loansPoints = 0;
  let loansImpact: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL' = 'NEUTRAL';

  if (input.existingLoans === 0) { loansPoints = 60; loansImpact = 'POSITIVE'; }
  else if (input.existingLoans >= 1 && input.existingLoans <= 2) { loansPoints = 20; loansImpact = 'POSITIVE'; }
  else { loansPoints = -60; loansImpact = 'NEGATIVE'; }

  score += loansPoints;
  factors.push({ name: 'Existing Loans', impact: loansImpact, detail: `${input.existingLoans} existing loans`, points: loansPoints });

  // 5. Loan-to-Income Ratio — 15% weight (max ±60 points)
  const lti = input.loanAmount / input.annualIncome;
  let ltiPoints = 0;
  let ltiImpact: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL' = 'NEUTRAL';

  if (lti < 2) { ltiPoints = 60; ltiImpact = 'POSITIVE'; }
  else if (lti >= 2 && lti <= 4) { ltiPoints = 20; ltiImpact = 'POSITIVE'; }
  else { ltiPoints = -60; ltiImpact = 'NEGATIVE'; }

  score += ltiPoints;
  factors.push({ name: 'Loan-to-Income Ratio', impact: ltiImpact, detail: `LTI is ${lti.toFixed(2)}`, points: ltiPoints });

  // 6. Age Factor — 10% weight (max ±30 points)
  let agePoints = 0;
  let ageImpact: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL' = 'NEUTRAL';

  if (input.age >= 25 && input.age <= 55) { agePoints = 30; ageImpact = 'POSITIVE'; }
  else if (input.age < 25) { agePoints = -20; ageImpact = 'NEGATIVE'; }
  else { agePoints = -40; ageImpact = 'NEGATIVE'; }

  score += agePoints;
  factors.push({ name: 'Age Factor', impact: ageImpact, detail: `Age ${input.age}`, points: agePoints });

  // Clamp final score to 300-900
  score = Math.max(300, Math.min(900, score));

  // Risk Category
  let riskCategory: ScoringResult['riskCategory'];
  if (score >= 750) riskCategory = 'LOW';
  else if (score >= 650) riskCategory = 'MEDIUM';
  else if (score >= 500) riskCategory = 'HIGH';
  else riskCategory = 'VERY_HIGH';

  // Max Eligible Amount
  const maxMonthlyDebt = (monthlyIncome * 0.5) - input.monthlyDebt;
  const maxEligibleAmount = Math.max(0, maxMonthlyDebt * input.loanTenureMonths * 0.85);

  // Recommended Interest Rate
  let recommendedInterestRate = 20.0;
  if (score >= 800) recommendedInterestRate = 8.5;
  else if (score >= 750) recommendedInterestRate = 10.0;
  else if (score >= 700) recommendedInterestRate = 12.0;
  else if (score >= 650) recommendedInterestRate = 14.5;
  else if (score >= 550) recommendedInterestRate = 17.0;

  return {
    score,
    riskCategory,
    maxEligibleAmount,
    recommendedInterestRate,
    factors
  };
}
