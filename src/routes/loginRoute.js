const express = require('express');
const { generateToken } = require('../utils/readAndWriteFiles.js');
const validateLogin = require('../middlewares/validateLogin');

const loginRoute = express.Router();

loginRoute.post('/', validateLogin, async (req, res) => {
  // const { email, password } = req.body;
  const token = generateToken();
  return res.status(200).json({ token });
});

module.exports = loginRoute;
