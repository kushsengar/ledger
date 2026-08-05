import { calculateScore, calculateEMI } from '../src/services/scoring.service';
import request from 'supertest';
import app from '../src/index';

describe('Scoring Service', () => {
  describe('calculateEMI', () => {
    it('should calculate EMI correctly', () => {
      const emi = calculateEMI(100000, 10, 12);
      expect(emi).toBeCloseTo(8791.59, 2);
    });

    it('should handle zero interest rate', () => {
      const emi = calculateEMI(120000, 0, 12);
      expect(emi).toBe(10000);
    });
  });

  describe('calculateScore', () => {
    it('should identify a low-risk applicant (high income, no debt, stable job)', () => {
      const result = calculateScore({
        annualIncome: 1200000,
        monthlyDebt: 0,
        existingLoans: 0,
        employmentYears: 6,
        loanAmount: 500000,
        loanTenureMonths: 24,
        employmentType: 'SALARIED',
        age: 30
      });
      expect(result.score).toBeGreaterThanOrEqual(750);
      expect(result.riskCategory).toBe('LOW');
      expect(result.factors.length).toBeGreaterThanOrEqual(6);
    });

    it('should identify a medium-risk applicant', () => {
      const result = calculateScore({
        annualIncome: 600000, // 50k monthly
        monthlyDebt: 5000,
        existingLoans: 1,
        employmentYears: 3,
        loanAmount: 1000000,
        loanTenureMonths: 36,
        employmentType: 'SALARIED',
        age: 28
      });
      expect(result.score).toBeGreaterThanOrEqual(650);
      expect(result.score).toBeLessThan(750);
      expect(result.riskCategory).toBe('MEDIUM');
    });

    it('should identify a high-risk applicant (high debt, low income, new job)', () => {
      const result = calculateScore({
        annualIncome: 300000, // 25k monthly
        monthlyDebt: 15000,
        existingLoans: 4,
        employmentYears: 1,
        loanAmount: 1500000, // LTI = 5
        loanTenureMonths: 48,
        employmentType: 'SELF_EMPLOYED',
        age: 23
      });
      expect(result.score).toBeLessThan(650);
      expect(['HIGH', 'VERY_HIGH']).toContain(result.riskCategory);
    });

    it('should handle edge case: zero monthly debt', () => {
      const result = calculateScore({
        annualIncome: 500000,
        monthlyDebt: 0,
        existingLoans: 0,
        employmentYears: 2,
        loanAmount: 200000,
        loanTenureMonths: 12,
        employmentType: 'SALARIED',
        age: 40
      });
      expect(result.factors.find(f => f.name === 'Debt-to-Income Ratio')?.impact).toBe('POSITIVE');
    });

    it('should handle edge case: max existing loans', () => {
      const result = calculateScore({
        annualIncome: 800000,
        monthlyDebt: 10000,
        existingLoans: 10,
        employmentYears: 5,
        loanAmount: 300000,
        loanTenureMonths: 24,
        employmentType: 'SALARIED',
        age: 35
      });
      expect(result.factors.find(f => f.name === 'Existing Loans')?.impact).toBe('NEGATIVE');
      expect(result.factors.find(f => f.name === 'Existing Loans')?.points).toBe(-60);
    });

    it('should handle edge case: very young applicant (18)', () => {
      const result = calculateScore({
        annualIncome: 400000,
        monthlyDebt: 0,
        existingLoans: 0,
        employmentYears: 0,
        loanAmount: 100000,
        loanTenureMonths: 12,
        employmentType: 'SALARIED',
        age: 18
      });
      expect(result.factors.find(f => f.name === 'Age Factor')?.points).toBe(-20);
    });

    it('should handle edge case: senior applicant (65)', () => {
      const result = calculateScore({
        annualIncome: 1000000,
        monthlyDebt: 0,
        existingLoans: 0,
        employmentYears: 20,
        loanAmount: 500000,
        loanTenureMonths: 36,
        employmentType: 'SELF_EMPLOYED',
        age: 65
      });
      expect(result.factors.find(f => f.name === 'Age Factor')?.points).toBe(-40);
    });

    it('should clamp score to 300-900', () => {
      const bestResult = calculateScore({
        annualIncome: 10000000,
        monthlyDebt: 0,
        existingLoans: 0,
        employmentYears: 10,
        loanAmount: 100000,
        loanTenureMonths: 12,
        employmentType: 'SALARIED',
        age: 35
      });
      expect(bestResult.score).toBeLessThanOrEqual(900);

      const worstResult = calculateScore({
        annualIncome: 200000, // 16k monthly
        monthlyDebt: 20000,
        existingLoans: 5,
        employmentYears: 0,
        loanAmount: 2000000, // LTI = 10, EMI will be very high
        loanTenureMonths: 12,
        employmentType: 'SELF_EMPLOYED',
        age: 60
      });
      expect(worstResult.score).toBeGreaterThanOrEqual(300);
    });
  });

  describe('API Routes', () => {
    it('should return health status', async () => {
      const response = await request(app).get('/health');
      expect(response.status).toBe(200);
      expect(response.body.status).toBe('UP');
    });

    it('should score an applicant via POST /api/v1/score', async () => {
      const response = await request(app).post('/api/v1/score').send({
        annualIncome: 1200000,
        monthlyDebt: 0,
        existingLoans: 0,
        employmentYears: 6,
        loanAmount: 500000,
        loanTenureMonths: 24,
        employmentType: 'SALARIED',
        age: 30
      });
      expect(response.status).toBe(200);
      expect(response.body.score).toBeDefined();
      expect(response.body.riskCategory).toBeDefined();
    });

    it('should return 400 for invalid input', async () => {
      const response = await request(app).post('/api/v1/score').send({
        annualIncome: -1200000, // invalid
      });
      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Validation failed');
    });
  });
});
