
exports.up = function(knex, Promise) {
  return knex.schema.createTable('communities', function (table) {
    table.increments();
    table.string('name');
    table.integer('population');
    table.integer('crime');
    table.integer('search');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('communities');
};
