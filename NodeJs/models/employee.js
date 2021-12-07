const mongoose=require('mongoose');

const EmployeeModel=mongoose.model('Employee',{
    name:{type:String},
    position:{type:String},
    office:{type:String},
    salary:{type:Number}
})

module.exports={EmployeeModel}