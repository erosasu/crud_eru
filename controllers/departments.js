const { get } = require('mongoose')
const departmentModel= require('../models/departmen')
const employeeModel= require('../models/employee')
const { add } = require('./employees')

module.exports={
    getDepartments: async (req,res)=>{
        try {
            const departments = await departmentModel.find()  
       
            res.render('./partials/departments/index', {
                layout: 'main',
                departments
              });
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: 'Internal Server Error'
            })
        }
    },
    addDepartmentPage: async (req, res)=>{
        const employees = await employeeModel.find()
        console.log(employees)
        res.render('./partials/departments/add', {
            layout: 'main'
            ,employees
          });
    },
    getDepartment: async (req, res)=>{
        const {id} = req.params
        try {
            const department = await departmentModel.findById(id)
            const employees = await employeeModel.find()
            res.render('./partials/departments/edit', {
                layout: 'main',
                department, employees
              });
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: 'Internal Server Error'
            })
        }
    },
    addDepartment: async (req,res)=>{

        let {name, description, employees} = req.body
        console.log(req.body)

        let this_employees=[]
        if (!Array.isArray(employees)) {
            employees = [employees];
        }
        for(employee of employees){
            console.log(employee)
            this_employees.push(await employeeModel.findById(employee))
        }
        try {

            const newDepartment = await departmentModel.create({name, description, employees:this_employees})    
            console.log(newDepartment)
            res.redirect('/departments')
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: 'Internal Server Error'
            })
        }
    },
    updateDepartment: async (req,res)=>{
        const {id} = req.params
        const {name, description, employee} = req.body
        try {
            console.log(req.body)
            const updatedDepartment = await departmentModel.findByIdAndUpdate(id, {name, description})
            updatedDepartment.employees.push(employee)
            const department= await updatedDepartment.save()
            const employees = await employeeModel.find()
            res.render('./partials/departments/edit', {
                layout: 'main',
                department, employees
              });
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: 'Internal Server Error'
            })
        }
    },
    deleteDepartment: async (req,res)=>{
        const {id} = req.params
        try {
            const deletedDepartment = await departmentModel.findByIdAndDelete(id)
            res.redirect('/departments')
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: 'Internal Server Error'
            })
        }
    }
}