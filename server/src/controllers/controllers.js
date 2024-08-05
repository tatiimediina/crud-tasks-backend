const { connectDB } = require('../db/database')

const ctrl  = {}

ctrl.getTasks = async (req, res)=>{
    console.log('a')
    const connection = await connectDB();

    const [ results ] = await connection.query('SELECT * FROM tasks');

    return res.json(results);
}
ctrl.addTasks = async (req, res)=>{

    const { title, description, isComplete }  = req.body
    
    const connection = await connectDB();

    const conexion = await connection.query(`INSERT INTO tasks (title, description, isComplete) VALUES ("${title}","${description}",${isComplete})`)

    if(conexion ){
        console.log('se añadio con exito')
    }

}
ctrl.getById = async(req,res)=>{

    const connection = await connectDB();

    const id = req.params.id 

    const conexion = await connection.query(`SELECT * FROM tasks WHERE id=${id}`)
    
    if(conexion){
        res.json(conexion)
    }

}
ctrl.delete = async(req,res)=>
module.exports = ctrl;