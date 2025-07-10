const bodyParser = require('body-parser');
const express=require('express');
const router = require('./routes');
const app=express();
const cors=require('cors')
require('dotenv').config

app.use(express.json());
app.use(bodyParser.json());
app.use(cors())
app.use("/api",router)

const PORT=process.env.DB_PORT||5000

app.listen(PORT,()=>{
    console.log(`server is listening at port ${PORT}`)
})