const mongoose = require('mongoose');

const EmployeeSchema = mongoose.Schema;

const Employee = new EmployeeSchema({
    name: {
        type: String,
        required: true
    },
    surname:{
        type: String,
        required: true
    },
    birth_day:{
        type: String,   
    },
   
    department: {
            type: String,
            required: true
    },
    salary: {
        type: Number,
        required: true
    },
    customers:[
        {name:{type:String},
        id:{type:String}}
    ]
});

module.exports = mongoose.model('Employee', Employee);