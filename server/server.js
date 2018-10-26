require('dotenv').config();

const app = require("express")(),
      ENV = process.env.ENV || "development",
      bodyParser = require("body-parser"),
      knexConfig  = require("./knexfile"),
      knex       = require("knex")(knexConfig[ENV]),
      morgan      = require('morgan'),
      pg          = require("pg")
      knexLogger  = require('knex-logger');

const PORT = process.env.PORT || 3001;
const queryHelper = require('./api/query-helper')

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.all('*',function(req,res,next)
{
    if (!req.get('Origin')) return next();

    res.set('Access-Control-Allow-Origin','*');
    res.set('Access-Control-Allow-Methods','GET,POST');
    res.set('Access-Control-Allow-Headers','X-Requested-With,Content-Type');

    if ('OPTIONS' == req.method) return res.sendStatus(200);

    next();
});

// this route is for our internal use
app.get("/api", (req, res) => {
  knex.select().table('communities')
  .then((data) => {
    res.json(data)
  })
})

// this route is for external use with different query
app.get("/api/public", (req, res) => {
  const client = new pg.Client({
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME,
    host     : process.env.DB_HOST,
    port     : 5432,
  });

  client.connect((err) => {
    if (err) {
      return console.error("Connection Error", err);
    }

    queryHelper.queryParser(req.query)
    .then(function(q){
      queryHelper.queryBuilder(q)
      .then((query) => {
        client.query(query, (err, result) => {
          if (err) {
            return console.error("error running query", err);
          }
          res.json(result.rows); //output: 1
          client.end();
        })
      })
    })
  });
})

app.post("/api/search", (req, res) => {
  const name = req.body.community
  knex("communities").where("name", "=", name)
  .then((data) => {
    knex("communities").where("name", "=", name)
    .update({search: data[0].search + 1})
    .then(() => {
      res.status(200)
    })
  })
})

app.listen(PORT, process.env.IP, () => {
  console.log("Server start on PORT: ", PORT)
})
