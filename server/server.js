require('dotenv').config();

const app = require("express")(),
      ENV = process.env.ENV || "development",
      bodyParser = require("body-parser"),
      knexConfig  = require("./knexfile"),
      knex       = require("knex")(knexConfig[ENV]),
      morgan      = require('morgan'),
      knexLogger  = require('knex-logger');

const PORT = 3002 || process.env.PORT;

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api", (req, res) => {
  res.send("api")
})

app.listen(PORT, process.env.IP, () => {
  console.log("Server start")
})
