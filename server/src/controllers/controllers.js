const { connectDB } = require('../db/database')

const ctrl  = {}

ctrl.getTasks = async (req, res)=>{
    console.log('a')
    const connection = await connectDB();

    const [ results ] = await connection.query('SELECT * FROM tasks');

    return res.json(results);

    connection.end
}
ctrl.addTasks = async (req, res)=>{

    const { title, description, isComplete }  = req.body
    
    const connection = await connectDB();

    const conexion = await connection.query(`INSERT INTO tasks (title, description, isComplete) VALUES ("${title}","${description}",${isComplete})`)

    res.send("tarea agregada")

   connection.end

}
ctrl.getById = async(req,res)=>{

    const id = req.params.id 

    const connection = await connectDB();


    const results = await connection.query(`SELECT * FROM tasks WHERE id=?`, id)
    
   res.json(results[0])

   connection.end

}
ctrl.deleteTasks = async(req,res)=>{
    const id = parseInt(req.params.id )

    const connection = await connectDB();

    const results = await connection.query(`DELETE FROM tasks WHERE id = ?`, id)

    res.send("tarea eliminada")

}

ctrl.editTasks = async (req, res) => {
    const id = parseInt(req.params.id);
    const { title, description, isComplete } = req.body;
    const connection = await connectDB();

    
    const results = await connection.query(
        `UPDATE tasks SET title = ?, description = ?, isComplete = ? WHERE id = ?`,
        [title, description, isComplete, id] 
    );

    res.json(results[0]);
};

module.exports = ctrl;