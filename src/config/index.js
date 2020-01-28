const dotenv = require('dotenv');
dotenv.config();

/**
 * This module is used to collect all the configuration variables,
 * like the environment vars, in one place so they are not scattered all over the entire codebase.
 */

module.exports = {
  port: process.env.PORT || 5000,
  github: {
    apiToken: process.env.GITHUB_API_TOKEN,
    apiBaseUri: 'https://api.github.com/',
    searchPath: 'search/',
    queryLimit: 10,
  },
};
