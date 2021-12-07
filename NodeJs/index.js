const express=require('express');
const app=express();
const port=3000;
const cors=require('cors');

const {mongoose}=require('./db.js');
const employeeController=require('./controllers/employeeController');


app.use(express.json());

app.use(cors({origin:'http://localhost:4200'}));


app.listen(port,()=>console.log("Server online"));

app.use('/employees',employeeController);
