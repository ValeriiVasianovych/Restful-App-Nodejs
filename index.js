require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

let usersArr = [];

app.listen(4000, () => {
   console.log('Server is running on port 4000');
});

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
   res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.post('/api', (req, res) => {
   const name = req.body.name;
   const id = req.body.id;
   usersArr.push({ id: id, name: name });
   res.json({ id: id, name: name });
   console.log(usersArr);
});

app.get('/api', (req, res) => {
   const user = usersArr.find((user) => user.id === req.query.id);
   res.json(user);
});

mongoose
   .connect(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@nodejsdb.yxstywt.mongodb.net/?retryWrites=true&w=majority&appName=nodejsDB`
   )
   .then(() => {
      console.log('Connected to the Database successfully');
   })
   .catch(() => {
      console.log('Error connecting to the Database');
   });
