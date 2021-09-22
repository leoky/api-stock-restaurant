import express from 'express';
import controller from '../controllers/inflowController';

const router = express.Router();

router.get('/', controller.getAll);
router.post('/', controller.create);
// router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

export default router;