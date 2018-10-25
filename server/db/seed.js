require('dotenv').config();

const app = require("express")(),
      ENV = process.env.ENV || "development",
      bodyParser = require("body-parser"),
      knexConfig  = require("../knexfile"),
      knex       = require("knex")(knexConfig[ENV]),
      morgan      = require('morgan'),
      knexLogger  = require('knex-logger');

app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

const axios = require('axios');

const promiseCrime = axios.get('https://data.calgary.ca/resource/kudt-f99k.json',{
  params: {
    "$select": "community_name, SUM(count)",
    year: 2018,
    "$group": "community_name"
  }});

const promisePopulation = axios.get('https://data.calgary.ca/resource/eme4-y5m7.json',{
  params: {
  "$select": "name, population",
  census_year: "2017-04-01T00:00:00.000"
  }})

app.get("/", function(req, res) {
  Promise.all([promisePopulation, promiseCrime]).then(function(res){
    const populationArr = res[0].data;
    const crimeArr = res[1].data;
    crimeArr.forEach(community => {
      knex('communities').insert({
        name: community.community_name,
        crime: Number(community.SUM_count),
        population: 0,
        search: 0
      })
      .then(() => {
        populationArr.forEach(community => {
          knex('communities').where('name', '=', community.name)
          .update({
            population: community.population
          })
          .then(()=>{
            console.log("done")
          })
        })
      })
    })
  })
  .then(() => {
    res.send("done")
  })
})

app.listen(8081, () => {
})