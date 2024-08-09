import { Router } from 'express';
const router = Router();
import { getTasks, addTasks, getById, deleteTasks, editTasks } from '../controllers/controllers.js';
import { applyValidations } from "../middlewares/apply.validations.js";
import { validateAddTask, validateUpdateTask } from "../validations/task.validations.js"

router.get('/',getTasks);
router.post('/',validateAddTask, applyValidations,addTasks);
router.get('/:id', getById);
router.delete('/:id',deleteTasks);
router.put('/:id', validateUpdateTask, applyValidations, editTasks);

export { router };