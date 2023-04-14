const fs = require('fs').promises;
const { join } = require('path');

const readTalkerManagerFile = async () => {
  const path = '../talker.json';
  try {
    const contentFile = await fs.readFile(join(__dirname, path), 'utf-8');
    return JSON.parse(contentFile);
  } catch (err) {
    return null;
  }
};

const getAllManagers = async () => {
  const allManagers = await readTalkerManagerFile();
  return allManagers;
};

const getManagerById = async (id) => {
  const managers = await readTalkerManagerFile();
  return managers.find((manager) => manager.id === id);
};

module.exports = {
  readTalkerManagerFile,
  getAllManagers,
  getManagerById,
};
