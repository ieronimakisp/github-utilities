# Github API Utilities Project

Playground project utilizing Github public API. Built with [Node.js](https://nodejs.org).

The API currently serves a single route, `/stats`, which accumulates the number of open issues count per language (e.g Java, JavaScript) for a specific number of projects.

# Quick Start

## Prerequisites

Define an .env file at the root directory of the project containing all the environment variables needed. You can find the keys needed for the env vars key-value pairs in the [configuration](https://github.com/ieronimakisp/github-utilities/tree/master/src/config) file.

## Using npm

You will need to [download and install Node.js and npm](https://nodejs.org/en/download/) in order to use this method. Navigate to project root folder and run the following commands to start the server:

```
npm install
npm start
```

# Testing

Navigate to project root folder and run:

```
npm test
```

# Architectural Decisions

The app is designed to use a layered architecture. The architecture is heavily influenced by the [Clean Architecture](http://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html). It aims to separate concerns and make the app easier to test and maintain. This also makes it easier to replace a routing framework or a data store, as the core business rules are independent of these layers implementation. Specifically, the following simple division is applied in the app structure:

- [domain](https://github.com/ieronimakisp/github-utilities/tree/master/src/domain) folder contains modules defining the core entities (models) and business rules (services) of the app. They are the least likely to change when something external (e.g database, routing) changes and thus do not depend on external components. In our use case, this layer will not change if Github data are fetched through the Github GraphQL API. This increases extensibility and maintainability.

- [router](https://github.com/ieronimakisp/github-utilities/tree/master/src/router) folder contains modules concerned with HTTP routing (routes, HTTP specifics like requests, responses, headers, params validation etc). Routing is implemented using Express.js but we can easily swap it with another framework.

- [data](https://github.com/ieronimakisp/github-utilities/tree/master/src/data) folder contains modules (repositories) concerned with data fetching and posting tasks. Current implementation is uitilizing Github Rest API v3.

# Routing

[Express](https://expressjs.com/) web framework is used to handle routing.

# Code Style

[Prettier](https://prettier.io/) and [ESLint](https://eslint.org/).

# Possible Extensions

- Containerize the service, preferably with [Docker](https://www.docker.com/).
- Maximize test coverage
- Document the API using [Swagger](https://swagger.io/)
- Add continuous integration and deployment (e.g deploy using [CircleCI](https://circleci.com/))
- Use a logger library
