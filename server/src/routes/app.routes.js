const { Router } = require('express');
const { getTasks, addTasks, getById, deleteTasks, editTasks } = require('../controllers/controllers')
const router = Router();

router.get('/tasks', getTasks);
router.post('/tasks',addTasks);
router.get('/tasks/:id', getById);
router.delete('/tasks/:id',deleteTasks);
router.put('/tasks/:id', editTasks);

module.exports = router;