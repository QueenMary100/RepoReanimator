import { Router } from 'express';
import { RepoController } from '../controllers/RepoController';
import { asyncHandler } from '../middleware/errorHandler';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/discover', asyncHandler(RepoController.discover));
router.get('/:id', asyncHandler(RepoController.getById));
router.get('/:id/health', asyncHandler(RepoController.getHealth));
router.post('/scan', authenticate, asyncHandler(RepoController.scanRepos));

export default router;
