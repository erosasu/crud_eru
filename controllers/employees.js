const employee =require('../models/employee')
const department =require('../models/departmen')

module.exports={
list :async  (req, res) => {
    try {
        const employees = await employee.find();
        console.log(employees)
        res.render('./partials/employees', {
          layout: 'main',
          employees
        });
      } catch (err) {
        res.render('./partials/employees', {
          layout: 'main',
          error: 'Error fetching employees'
        });
      }
},
add:async (req, res) => {
    const departments = await department.find()
    res.render('./partials/employees/add', {
        layout: 'main',
        departments
    });
},
create :  async (req, res) => {
    try {
      const { name, surname, birth_day, department, salary, customers } = req.body;
      console.log(req.body)
      const newEmploye= await employee.create({
        name,
        surname,
        birth_day,
        department,
        salary,
        
      });
      console.log(newEmploye);
      res.redirect('/employees');
    } catch (error) {
        console.log(error)
      res.render('./partials/employees/add', {
        layout: 'main',
        error: 'Error adding employee'
      });
    }
  },  
update : (req, res) => {
    console.log(req.body)
    employee.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true})
    .then((employee) => {
      res.render('./partials/employees/edit', {
        layout: 'main',
        employee
    });
    })
    .catch((err) => {
        res.json(err)
    })
},
viewEdit : (req, res) => {
    employee.findById(req.params.id)
    .then((employee) => {
        res.render('./partials/employees/edit', {
            layout: 'main',
            employee
        });
    })
    .catch((err) => {
        res.json(err)
    })
},
show : (req, res) => {
    employee.findById(req.params.id)
    .then((employee) => {
        res.json(employee)
    })
    .catch((err) => {
        res.json(err)
    })
},
destroy : (req, res) => {
    employee.findByIdAndDelete(req.params.id)
    .then((employee) => {
        res.redirect('/employees');
       
    })
    .catch((err) => {
        res.redirect('/employees');
    
    })
}
}