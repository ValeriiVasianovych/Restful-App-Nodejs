const express = require('express');
const User = require('../models/user.model.js');
const router = express.Router();
const {getUsers, getUser, addUser, updateUser, deleteUser} = require('../controllers/user.controller.js');

router.get('/', getUsers);

router.get('/:id', getUser);

router.post("/", addUser);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

module.exports = router;