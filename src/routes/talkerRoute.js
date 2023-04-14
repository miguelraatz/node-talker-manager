const express = require('express');

const { getAllManagers } = require('../utils/readAndWriteFiles.js');

const talkerRoute = express.Router();

talkerRoute.get('/', async (_req, res) => {
  const managers = await getAllManagers();
  if (!managers) return res.status(200).json([]);
  return res.status(200).json(managers);
});

module.exports = talkerRoute;
