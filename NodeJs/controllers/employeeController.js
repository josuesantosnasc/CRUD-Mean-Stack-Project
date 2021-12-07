const express = require("express");
const router = express.Router();
const ObjectId=require('mongoose').Types.ObjectId;


const { EmployeeModel } = require("../models/employee");

router.get("/", (req, res) => {
  EmployeeModel.find((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log(`Error in retrivin employees:${err}`);
    }
  });
});


router.get('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send(`There's no data with id: ${req.params.id}`)
    }

    EmployeeModel.findById(req.params.id,(err,doc)=>{
        if(!err){res.send(doc);}
        else{console.log(`Error in retriving Employee ${err}`)};
    })
})

router.post("/",(req,res)=>{
   let employeeData=new EmployeeModel({
       name:req.body.name,
       position:req.body.position,
       office:req.body.office,
       salary:req.body.salary
   })

   employeeData.save((err,doc)=>{
       if(!err){
           res.send(doc)
       }else{
           console.log(`Error in Employee:${err}`);
       }
   })
})

router.put('/:id',(req,res)=>{
  if(!ObjectId.isValid(req.params.id)){
    return res.status(400).send(`No record with given id:${req.params.id}`);
  }
  var emp={
    name:req.body.name,
    position:req.body.position,
    office:req.body.office,
    salary:req.body.salary
  };

  EmployeeModel.findByIdAndUpdate(req.params.id,{$set:emp},{new:true},(err,doc)=>{
    if(!err){
      res.send(doc);
    }else{
      console.log('Erro in Employee Update'+JSON.stringify(err,undefined,2));
    }
  });
});

router.delete('/:id',(req,res)=>{
  if(!ObjectId.isValid(req.params.id))
  return res.status(400).send(`No record with given id:${req.params.id}`);

  EmployeeModel.findByIdAndRemove(req.params.id,(err,doc)=>{
    if(!err){
      res.send(doc);
    }else{
      console.log(`Error in Employee Delete:`+JSON.stringify(err,undefined,2));
    }
  })
})

module.exports=router;