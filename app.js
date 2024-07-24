const express = require('express');
const conectDB = require('./config/db');
const app = express();
const { engine } = require('express-handlebars');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan')

// Connect to MongoDB
// Ensure you have a `connect` method in your `db` configuration

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

// Method Override Middleware
app.use(methodOverride('_method'));

// Handlebars Middleware
app.engine('handlebars', engine({
  layoutsDir: path.join(__dirname, 'views', 'layouts'),
  defaultLayout: 'main',
  partialsDir: path.join(__dirname, 'views', 'partials'),
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true, 
  },
  helpers: {
    eq: function (a, b) {
      return a === b;
    },
    isSelected: function(employeeId, departmentEmployees) {
      if (!Array.isArray(departmentEmployees)) {
        console.error('Expected an array for departmentEmployees, but received:', departmentEmployees);
        return '';
      }
      // Filter out any null or undefined values
      const validEmployees = departmentEmployees.filter(emp => emp);
      return validEmployees.some(emp => emp.toString() === employeeId.toString()) ? 'selected' : '';
    }}    
}));


app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Static Files
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
  res.render('index.handlebars');
});
// Static files


// Routes
const employeeRoutes = require('./routes/employees');
const departmentRoutes = require('./routes/api');
app.use(require('./routes/api'));


const port = process.env.PORT || 5050;
app.listen(port, () => {
  conectDB();
  console.log(`Server running on port ${port}`);
});

module.exports = app;