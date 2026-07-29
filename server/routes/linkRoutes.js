// routes/linkRoutes.js
import express from 'express';
import {
  createShortLink,
  getAllLinks,
  getLinkById,
  toggleLinkStatus,
  deleteLink,
} from '../controllers/linkController.js';

const router = express.Router();

router.post('/shorten', createShortLink);
router.get('/', getAllLinks);
router.get('/:id', getLinkById);
router.patch('/:id/toggle', toggleLinkStatus);
router.delete('/:id', deleteLink);

export default router;