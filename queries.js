
//Connecting to the postgres database from Node.js

const { Pool } = require('pg')

const pool = new Pool({
  user: 'me_1',
  host: 'localhost',
  database: 'resffulapi',
  password: 'password1',
  port: 5432,
})

//GET all users
const getUsers = async (request, response) => {
   await pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
        response.status(200).json(results.rows)
        console.table(results.rows)
    })
  }
//GET a single user by id
const getUserById = async (request, response) => {
    const id = parseInt(request.params.id) //Convert id to number
  
    await pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
      console.log(results.rows)
    
    })
  }
//POST: create a new user
const createUser = async (request, response) => {
    const { name, email , date_of_birth } = request.body
    await pool.query('INSERT INTO users (name, email, date_of_birth) VALUES ($1, $2, $3)',
    [name, email, date_of_birth], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${results.insertId}`)
    })
  }
//PUT updated data in an existing user
const updateUser = async (request, response) => {
    const id = parseInt(request.params.id)
    const { name, email, date_of_birth } = request.body
  
    await pool.query(
      'UPDATE users SET name = $1, email = $2, date_of_birth = $3 WHERE id = $4',
      [name, email, date_of_birth, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`User modified with ID: ${id}`)
      }
    )
  }
//DELETE a user
const deleteUser = async (request, response) => {
    const id = parseInt(request.params.id)
    await pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${id}`)
    })
  }
module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
  }
  
  
  