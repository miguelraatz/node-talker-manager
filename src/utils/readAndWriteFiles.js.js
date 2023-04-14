const fs = require('fs').promises;
const crypto = require('crypto');
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

const generateToken = () => crypto.randomBytes(8).toString('hex');

const getLastId = async () => {
  const allManagers = await readTalkerManagerFile();
  return allManagers.length;
};

const insertManagerInFile = async (manager) => {
  try {
    const allManagers = await readTalkerManagerFile();
    allManagers.push(manager);
    return await fs.writeFile('src/talker.json', JSON.stringify(allManagers));
  } catch (err) {
    return null;
  }
};

const editManagerInFile = async (post, id) => {
  const allManagers = await readTalkerManagerFile();
  let changedManager;
  for (let i = 0; i < allManagers.length; i += 1) {
    if (allManagers[i].id === +id) {
      allManagers[i].name = post.name;
      allManagers[i].age = post.age;
      allManagers[i].talk = post.talk;
      changedManager = allManagers[i];
    }
  }
  await fs.writeFile('src/talker.json', JSON.stringify(allManagers));
  return changedManager;
};

module.exports = {
  readTalkerManagerFile,
  getAllManagers,
  getManagerById,
  generateToken,
  insertManagerInFile,
  getLastId,
  editManagerInFile,
};
