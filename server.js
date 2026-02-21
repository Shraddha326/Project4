const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse JSON body
app.use(bodyParser.json());
// Add this near the top after requiring express
app.use(express.static('public')); // Serve frontend files

// Sample employee data
let employees = [
  { id: 1, name: 'Alice', role: 'Developer' },
  { id: 2, name: 'Bob', role: 'Designer' },
];

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to Employee Management API');
});

// Get all employees
app.get('/employees', (req, res) => {
  res.json(employees);
});

// Get employee by ID
app.get('/employees/:id', (req, res) => {
  const emp = employees.find(e => e.id === parseInt(req.params.id));
  if (!emp) return res.status(404).send('Employee not found');
  res.json(emp);
});

// Add new employee
app.post('/employees', (req, res) => {
  const newEmp = {
    id: employees.length + 1,
    name: req.body.name,
    role: req.body.role
  };
  employees.push(newEmp);
  res.status(201).json(newEmp);
});

// Update employee
app.put('/employees/:id', (req, res) => {
  const emp = employees.find(e => e.id === parseInt(req.params.id));
  if (!emp) return res.status(404).send('Employee not found');

  emp.name = req.body.name || emp.name;
  emp.role = req.body.role || emp.role;

  res.json(emp);
});

// Delete employee
app.delete('/employees/:id', (req, res) => {
  const empIndex = employees.findIndex(e => e.id === parseInt(req.params.id));
  if (empIndex === -1) return res.status(404).send('Employee not found');

  const deleted = employees.splice(empIndex, 1);
  res.json(deleted[0]);
});

// Start server
app.listen(port, () => {
  console.log(`Employee server running at http://localhost:${port}`);
});