const { Router } = require('express');
const { getTasks, addTasks, getById } = require('../controllers/controllers')
const router = Router();

router.get('/tasks', getTasks);
router.post('/tasks',addTasks);
router.get('/tasks/:id', getById)

module.exports = router;