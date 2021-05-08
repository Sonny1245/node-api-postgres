
exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id').unsigned().primary();
        table.string('first_name');
        table.string('last_name');
        table.string('email');
        table.date('date_of_birth');
    }); 
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('users');
  
  };