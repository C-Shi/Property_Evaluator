require('dotenv').config();

const app = require("express")(),
      ENV = process.env.ENV || "development",
      bodyParser = require("body-parser"),
      knexConfig  = require("./knexfile"),
      knex       = require("knex")(knexConfig[ENV]),
      morgan      = require('morgan'),
      knexLogger  = require('knex-logger');

const PORT = process.env.PORT || 4001;

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

    if ('OPTIONS' == req.method) return res.send(200);

    next();
});

app.get("/api", (req, res) => {
  console.log(req.query)
  knex.select().table('communities')
  .then((data) => {
    res.json(data)
  })
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
