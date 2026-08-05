import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { logger } from '../utils/logger';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  if (err instanceof ZodError) {
    logger.warn('Validation error', err.errors);
    return res.status(400).json({
      error: 'Validation failed',
      details: err.errors
    });
  }

  logger.error('Internal server error', err);
  res.status(500).json({
    error: 'Internal server error'
  });
}
