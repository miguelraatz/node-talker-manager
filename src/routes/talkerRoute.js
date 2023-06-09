const express = require('express');

const {
  getAllManagers,
  getManagerById,
  getLastId,
  insertManagerInFile,
  editManagerInFile,
  deleteManager,
  searchByName,
} = require('../utils/readAndWriteFiles.js');

const auth = require('../middlewares/auth');
const validateName = require('../middlewares/validateName');
const validateTalk = require('../middlewares/validateTalk');
const validateAge = require('../middlewares/validateAge');
const validateWatchedAt = require('../middlewares/validateWatchedAt');
const validateRate = require('../middlewares/validateRate');
const validateSearch = require('../middlewares/validateSearch');

const talkerRoute = express.Router();

const validations = [
  auth,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
];

talkerRoute.get('/search', auth, validateSearch, async (req, res) => {
  const { q } = req.query;
  const talkers = await getAllManagers();
  if (!q || q === '') {
    return res.status(200).json(talkers);
  }
  const talkerByName = await searchByName(q);
  return res.status(200).json(talkerByName);
});

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

talkerRoute.post('/', validations, async (req, res) => {
  const { name, age, talk } = req.body;
  const lastId = (await getLastId()) + 1;
  const newManager = {
    name,
    age,
    id: lastId,
    talk,
  };
  await insertManagerInFile(newManager);
  return res.status(201).json(newManager);
});

talkerRoute.put('/:id', validations, async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const editManager = {
    name,
    age,
    id: +id,
    talk,
  };
  const manager = await editManagerInFile(editManager, id);
  if (!manager) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(editManager);
});

talkerRoute.delete('/:id', auth, async (req, res) => {
  const { id } = req.params;
  await deleteManager(id);
  return res.status(204).json();
});

module.exports = talkerRoute;
