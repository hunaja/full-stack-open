import { Router } from 'express';
import diagnosesService from '../services/diagnosesService';

const router = Router();

router.get('/', (_req, res) => res.json(diagnosesService.getAll()));

export default router;
