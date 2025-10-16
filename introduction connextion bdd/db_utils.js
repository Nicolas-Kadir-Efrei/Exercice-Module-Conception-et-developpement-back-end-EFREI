const { Client } = require('pg')

const client = new Client({
  host: 'localhost',
  database: 'mabase',
  user: process.env.dbuser || 'postgres',
  password: process.env.dbpwd || 'root',
  port: 5432,
})

async function main() {
    try {
            await client.connect()
    } catch (error) {
        console.log(error)
    }

  const query = {
    text: 'SELECT * FROM users',
    rowMode: 'array',
  }
  const res = await client.query(query)
  console.log(res.fields.map(field => field.name))
  console.log(res.rows)
  await client.end()
}

main()


function getConnection(username, password, database) {
  return new Client({
    host: 'localhost',
    database,
    user: username || process.env.dbuser || 'postgres',
    password: password || process.env.dbpwd || 'root',
    port: 5432,
  })
}

function getUsers(callback) {
  const client = getConnection(process.env.dbuser, process.env.dbpwd, 'mabase')
  client.connect()
    .then(() => client.query('SELECT * FROM users'))
    .then(res => callback(null, res.rows))
    .catch(err => callback(err, null))
    .finally(() => client.end())
}

getUsers((err, users) => {
  if (err) console.error(err)
  else console.log(users)
})

function insert_user(user) {
  const client = getConnection(process.env.dbuser, process.env.dbpwd, 'mabase')
  const query = {
    text: 'INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING *',
    values: [user.name, user.email, user.password],
  }
  
  return new Promise((resolve, reject) => {
    client.connect()
      .then(() => client.query(query))
      .then(res => {
        resolve(res.rows[0])
      })
      .catch(err => {
        reject(err)
      })
      .finally(() => client.end())
  })
}