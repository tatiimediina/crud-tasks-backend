import { Router } from 'express';
import { getTasks, addTasks, getById, deleteTasks, editTasks } from '../controllers/controllers.js';
const router = Router();

router.get('/', getTasks);
router.post('/',addTasks);
router.get('/:id', getById);
router.delete('/:id',deleteTasks);
router.put('/:id', editTasks);

export { router };