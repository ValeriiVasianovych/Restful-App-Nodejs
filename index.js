require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user.model');
const userRoute = require('./routes/user.route');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', userRoute);

app.get('/', (req, res) => {
   res.send('Welcome to the Node.js and MongoDB application!');
});

mongoose
   .connect(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@nodejsdb.yxstywt.mongodb.net/?retryWrites=true&w=majority&appName=nodejsDB`
   )
   .then(() => {
      console.log('Connected to the Database successfully');
      app.listen(4000, () => {
         console.log('Server is running on port 4000');
      });
   })
   .catch(() => {
      console.log('Error connecting to the Database');
   });
