const express = require('express');
const router = express.Router();
const {
  getRepositoryById,
  getRepositoryByName,
  getAllRepositories,
  saveRepositories,
} = require('../repositoryService');
const { fetchTrendingRepositories } = require('../githubService');

router.get('/repository/:id', async (req, res) => {
  const id = req.params.id;
  const repo = await getRepositoryById(id);
  res.json(repo);
});

router.get('/repository-by-name/:name', async (req, res) => {
  const name = req.params.name;
  try {
    const repo = await getRepositoryByName(name);
    if (repo) {
      res.json(repo);
    } else {
      res.status(404).json({ error: 'Repository not found' });
    }
  } catch (error) {
    console.error('Error fetching repository by name:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/repositories', async (req, res) => {
  const repos = await getAllRepositories();
  res.json(repos);
});

router.post('/sync', async (req, res) => {
  try {
    const repos = await fetchTrendingRepositories();
    await saveRepositories(repos);
    res.json({ message: 'Sync completed' });
  } catch (error) {
    console.error('Error during sync:', error);
    res.status(500).json({ error: 'Sync failed' });
  }
});

module.exports = router;
