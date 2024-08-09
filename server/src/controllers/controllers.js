import { connectDB } from "../db/database.js";
import { validationResult } from "express-validator"

export const validateTaskData = (title, description, isComplete) => {
    if (typeof title !== 'string' || title.trim() === '' || title.length > 255) {
        return { valid: false, message: 'El titulo debe ser una cadena no vacía de un máximo de 255 caracteres' };
    }
    if (typeof description !== 'string' || description.trim() === '') {
        return { valid: false, message: 'La descripción debe ser una cadena no vacía.' };
    }
    if (typeof isComplete !== 'boolean') {
        return { valid: false, message: 'isComplete debe ser un valor booleano.' };
    }
    return { valid: true };
}

export const getTasks = async (req, res) => {
    try {
        const connection = await connectDB();
        const [results] = await connection.query('SELECT * FROM tasks');
        return res.status(200).json(results);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error al obtener tareas' });
    } 
};

export const addTasks = async (req, res) => {

    const { title, description, isComplete } = req.body;

    const validation = validateTaskData(title, description, isComplete);
    if (!validation.valid) {
        return res.status(400).json({ error: validation.message });
    }

    try {
        const connection = await connectDB();
        await connection.query('INSERT INTO tasks (title, description, isComplete) VALUES (?, ?, ?)', [title, description, isComplete]);

        return res.status(201).json({ message: 'Tarea añadida' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error al añadir tarea' });

    } 
};
export const getById = async (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        console.log('')
        return res.status(400).json({ error: 'id no válido' }) 
        
    }

    try {
        const connection = await connectDB();
        const [results] = await connection.query('SELECT * FROM tasks WHERE id = ?', [id]);
        connection.end();

        if (results.length === 0) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }

        return res.status(200).json(results[0]);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error al obtener la tarea' });
    }
};

export const deleteTasks = async (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: 'id no válido' });
    }

    try {
        const connection = await connectDB();
        const [results] = await connection.query('DELETE FROM tasks WHERE id = ?', [id]);

        if(res.status(404)){
            res.send({message: "La tarea no existe"})
        } else {
        res.status(200).json({ message: 'Tarea eliminada' });
        }

        connection.end()
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error al eliminar tarea' });
    }
};

export const editTasks = async (req, res) => {
    const id = parseInt(req.params.id);

    const { title, description, isComplete } = req.body;

    if (isNaN(id)) {
        console.log('nan')
        return res.status(400).json({ error: 'id no válido' });
    }

    const validation = validateTaskData(title, description, isComplete);
    if (!validation.valid) {
        return res.status(400).json({ error: validation.message });
    }

    try {
        const connection = await connectDB();
        const [results] = await connection.query('UPDATE tasks SET title = ?, description = ?, isComplete = ? WHERE id = ?', [title, description, isComplete, id]);

        res.status(200).json({ message: 'Tarea editada' });
        
        connection.end();

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error al editar tarea' });
    }
};


