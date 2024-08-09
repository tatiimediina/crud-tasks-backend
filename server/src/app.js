import express, { json } from 'express';
import morgan from 'morgan';
import cors from 'cors';


const app = express();

app.use(json())
app.use(morgan('dev'));
app.use(cors());

const port = process.env.port || 3000;

import { router } from "./routes/app.routes.js"

app.use('/tasks', router)

app.listen(port,()=>{
    console.log(`server on port ${port}`)
}
)