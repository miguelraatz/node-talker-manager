const express = require('express');
const { generateToken } = require('../utils/readAndWriteFiles.js');
const validateEmail = require('../middlewares/validateEmail');
const validatePassword = require('../middlewares/validatePassword');

const loginRoute = express.Router();

loginRoute.post('/', validateEmail, validatePassword, async (_req, res) => {
  const token = generateToken();
  return res.status(200).json({ token });
});

module.exports = loginRoute;
