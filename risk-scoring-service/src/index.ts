import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorHandler';
import scoringRoutes from './routes/scoring.routes';
import { logger } from './utils/logger';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(scoringRoutes);

app.use(errorHandler);

if (require.main === module) {
  app.listen(PORT, () => {
    logger.info(`Risk scoring service listening on port ${PORT}`);
  });
}

export default app;
