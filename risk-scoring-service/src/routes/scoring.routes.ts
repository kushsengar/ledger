import { Router, Request, Response } from 'express';
import { validateScoringInput } from '../middleware/validation';
import { calculateScore } from '../services/scoring.service';

const router = Router();

router.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'UP',
    timestamp: new Date().toISOString()
  });
});

router.post('/api/v1/score', validateScoringInput, (req: Request, res: Response) => {
  const result = calculateScore(req.body);
  res.json(result);
});

export default router;
