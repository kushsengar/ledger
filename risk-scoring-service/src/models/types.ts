export interface ScoringInput {
  annualIncome: number;
  monthlyDebt: number;
  existingLoans: number;
  employmentYears: number;
  loanAmount: number;
  loanTenureMonths: number;
  employmentType: 'SALARIED' | 'SELF_EMPLOYED';
  age: number;
}

export interface ScoringResult {
  score: number;              // 300-900 range
  riskCategory: 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY_HIGH';
  maxEligibleAmount: number;
  recommendedInterestRate: number;
  factors: ScoringFactor[];
}

export interface ScoringFactor {
  name: string;
  impact: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL';
  detail: string;
  points: number;
}
