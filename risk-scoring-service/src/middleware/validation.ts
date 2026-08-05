import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';

export const scoringInputSchema = z.object({
  annualIncome: z.number().positive(),
  monthlyDebt: z.number().nonnegative(),
  existingLoans: z.number().int().nonnegative(),
  employmentYears: z.number().nonnegative(),
  loanAmount: z.number().positive(),
  loanTenureMonths: z.number().int().min(6).max(360),
  employmentType: z.enum(['SALARIED', 'SELF_EMPLOYED']),
  age: z.number().int().min(18).max(70)
});

export function validateScoringInput(req: Request, res: Response, next: NextFunction) {
  try {
    req.body = scoringInputSchema.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
}
