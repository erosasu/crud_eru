const express= require('express');
const router = require('express').Router()

const departments= require('../controllers/departments')
const employees= require('../controllers/employees')

router.get('/departments', departments.getDepartments)
router.get('/departments/add', departments.addDepartmentPage)
router.get('/departments/edit/:id', departments.getDepartment)
router.post('/departments/create', departments.addDepartment)
router.put('/departments/edit/:id', departments.updateDepartment)
router.post('/departments/delete/:id', departments.deleteDepartment)

router.get('/employees', employees.list)
router.get('/employees/add', employees.add)
router.post('/employees/add', employees.create)
router.put('/employees/edit/:id', employees.update)
router.get('/employees/edit/:id', employees.viewEdit)
router.get('/employees/delete/:id', employees.destroy)
router.get('/employees/:id', employees.show)




module.exports= router