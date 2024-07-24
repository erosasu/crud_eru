


const employees= require('../controllers/employees')
 const express= require('express')
 const router = require('express').Router()

router.get('/employees/list', employees.list)
router.post('/employees/create', employees.create)
router.put('/employees/update/:id', employees.update)
router.delete('/employees/delete/:id', employees.destroy)
router.get('/employees/:id', employees.show)

module.exports = router




