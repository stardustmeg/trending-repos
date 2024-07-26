const { Command } = require('commander');
const axios = require('axios');

const program = new Command();
const API_URL = 'http://localhost:3000/api';

program.version('0.1.0').description('CLI Client to interact with the GitHub Repository API');

program
  .command('get-by-id <id>')
  .description('Get repository by ID')
  .action(async (id) => {
    try {
      const response = await axios.get(`${API_URL}/repository/${id}`);
      console.log('Repository:', response.data);
    } catch (error) {
      console.error(
        'Error fetching repository:',
        error.response ? error.response.data : error.message,
      );
    }
  });

program
  .command('get-by-name <name>')
  .description('Get repository by name')
  .action(async (name) => {
    try {
      const response = await axios.get(`${API_URL}/repository-by-name/${name}`);
      console.log('Repository:', response.data);
    } catch (error) {
      console.error(
        'Error fetching repository by name:',
        error.response ? error.response.data : error.message,
      );
    }
  });

program
  .command('get-all')
  .description('Get all repositories')
  .action(async () => {
    try {
      const response = await axios.get(`${API_URL}/repositories`);
      console.log('Repositories:', response.data);
    } catch (error) {
      console.error(
        'Error fetching repositories:',
        error.response ? error.response.data : error.message,
      );
    }
  });

program
  .command('sync')
  .description('Start sync with GitHub')
  .action(async () => {
    try {
      const response = await axios.post(`${API_URL}/sync`);
      console.log('Sync Status:', response.data);
    } catch (error) {
      console.error('Error starting sync:', error.response ? error.response.data : error.message);
    }
  });

program.parse(process.argv);
