// routes/redirectRoutes.js
import express from 'express';
import { redirectToOriginal } from '../controllers/linkController.js';

const router = express.Router();
router.get('/:shortCode', redirectToOriginal);

export default router;