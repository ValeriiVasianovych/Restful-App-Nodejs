const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   id: {
	  type: Number,
	  required: true
   },	
   name: {
	  type: String,
	  required: true
   },
   surname: {
	  type: String,
	  required: true
   },
   company: {
	  type: String,
	  required: true
   },
   position: {
	  type: String,
	  required: true
   },
});

const User = mongoose.model('User', userSchema);

module.exports = User;