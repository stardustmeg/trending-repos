const express = require('express');
const { scheduleJob } = require('node-schedule');
const apiRoutes = require('./routes/apiRoutes');
const { fetchTrendingRepositories } = require('./githubService');
const { saveRepositories } = require('./repositoryService');

const app = express();
app.use(express.json());
app.use('/api', apiRoutes);

const syncInterval = 1;

scheduleJob(`*/${syncInterval} * * * *`, async () => {
  const repos = await fetchTrendingRepositories();
  await saveRepositories(repos);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
