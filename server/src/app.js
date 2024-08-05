const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const database = require('./db/database')

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json())

const port = process.env.port || 3000;

app.use(require('./routes/app.routes'))

app.listen(port,()=>{
    console.log(`server on port ${port}`)
}
)