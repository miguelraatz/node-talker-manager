const express = require('express');

const { getAllManagers, getManagerById } = require('../utils/readAndWriteFiles.js');

const talkerRoute = express.Router();

talkerRoute.get('/', async (_req, res) => {
  const managers = await getAllManagers();
  if (!managers) return res.status(200).json([]);
  return res.status(200).json(managers);
});

talkerRoute.get('/:id', async (req, res) => {
  const { id } = req.params;
  const manager = await getManagerById(+id);
  if (!manager) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  return res.status(200).json(manager);
});

module.exports = talkerRoute;
