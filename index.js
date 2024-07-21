const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const EmployeeModel = require('./model/Employee');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/integrationb8", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.post('/register', (req, res) => {
  EmployeeModel.create(req.body)
    .then(employees => res.json(employees))
    .catch(err => res.json(err));
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  EmployeeModel.findOne({ email, password })
    .then(employee => {
      if (employee) {
        res.json({ success: true, message: 'Login successful!' });
      } else {
        res.json({ success: false, message: 'Invalid credentials' });
      }
    })
    .catch(err => res.json(err));
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});


