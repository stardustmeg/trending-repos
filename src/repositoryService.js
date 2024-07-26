const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

(async () => {
  await client.connect();
})();

async function saveRepositories(repositories) {
  try {
    await client.query('BEGIN');
    await client.query('DELETE FROM repositories');

    const query =
      'INSERT INTO repositories(id, name, stars) VALUES($1, $2, $3) ON CONFLICT (id) DO NOTHING';
    for (const repo of repositories) {
      await client.query(query, [repo.id, repo.name, repo.stargazers_count]);
    }

    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error saving repositories:', error);
    throw error;
  }
}

async function getRepositoryById(id) {
  const result = await client.query('SELECT * FROM repositories WHERE id = $1', [id]);
  return result.rows[0];
}

async function getRepositoryByName(name) {
  const result = await client.query('SELECT * FROM repositories WHERE LOWER(name) = LOWER($1)', [
    name,
  ]);
  return result.rows[0];
}

async function getAllRepositories() {
  const result = await client.query('SELECT * FROM repositories');
  return result.rows;
}

module.exports = {
  saveRepositories,
  getRepositoryById,
  getAllRepositories,
  getRepositoryByName,
};
