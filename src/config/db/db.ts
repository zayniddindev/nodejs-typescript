import knex from "knex";

const db = knex({
  client: "mysql2",
  connection: {
    host: "localhost",
    database: "my_db",
    user: "root",
    password: "root",
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
    directory: "./src/config/db/migrations",
  },
  seeds: {
    directory: "./src/config/db/seeds",
  },
});

export default db;
