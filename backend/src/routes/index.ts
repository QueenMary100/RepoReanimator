import { Router } from 'express';
import authRoutes from './auth.routes';
import repoRoutes from './repo.routes';
import revivalRoutes from './revival.routes';
import contributionRoutes from './contribution.routes';
import leaderboardRoutes from './leaderboard.routes';
import userRoutes from './user.routes';
import webhookRoutes from './webhook.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/repos', repoRoutes);
router.use('/revivals', revivalRoutes);
router.use('/contributions', contributionRoutes);
router.use('/leaderboard', leaderboardRoutes);
router.use('/users', userRoutes);
router.use('/webhooks', webhookRoutes);

export default router;
