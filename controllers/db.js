require("dotenv").config();
const postgresURI = process.env.POSTGRESURI;
const knex = require("knex")({
  client: "pg",
  connection: {
    connectionString: `postgresql://postgres:postgres@${postgresURI}:5432/csearch`,
    ssl: false,
  },
});

module.exports = { knex };
