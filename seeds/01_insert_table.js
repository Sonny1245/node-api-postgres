
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { first_name: 'Steve', last_name:'Scott', email: 'sample@yahoo.com', date_of_birth: '1965-03-21' },
        { first_name: 'John', last_name:'Smith', email: 'john@google.com', date_of_birth: '1989-01-30' },
        { first_name: 'Brandon', last_name:'Lee', email: 'brandon@gmail.com', date_of_birth: '2001-04-18'}
      ]);
    });
};