require('dotenv').config();

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host     : "localhost",
      user     : "realmap",
      password : "realmap",
      database : "realmap",
      port     : 5432
    },
    migrations: {
      directory: './db/migrations',
      tableName: 'migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL + '?ssl=true',
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'migrations'
    }
  }

};