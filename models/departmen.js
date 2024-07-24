const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const departmentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    employees:[{
        name:{type:String},
        surname:{type:String},
        id:{type:String}
    }]
}, ); 

module.exports = mongoose.model('Department', departmentSchema);