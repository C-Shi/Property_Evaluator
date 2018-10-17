require('dotenv').config();

const app = require("express")(),
      ENV = process.env.ENV || "development"
      bodyParser = require("body-parser"),
      knexConfig  = require("./knexfile"),
      knex       = require("knex")(knexConfig[ENV]),
      morgan      = require('morgan'),
      knexLogger  = require('knex-logger');

const PORT = 8080 || prcoess.env.PORT

app.listen(PORT, process.env.IP, () => {
  console.log("Server start")
})
