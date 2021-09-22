import express from 'express';
import controller from '../controllers/igTypeController';

const router = express.Router();

router.get('/', controller.getAll);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);
router.post('/assignto', controller.assignTo);

export default router;