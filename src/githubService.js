const axios = require('axios');

async function fetchTrendingRepositories() {
  try {
    const response = await axios.get(
      'https://api.github.com/search/repositories?q=stars:>1&sort=stars&order=desc',
    );
    return response.data.items;
  } catch (error) {
    console.error('Error fetching repositories:', error);
    throw error;
  }
}

module.exports = { fetchTrendingRepositories };
