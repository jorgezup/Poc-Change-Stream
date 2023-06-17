const { MongoClient } = require('mongodb')
const {mongo_uri, db, collectionName} = require('./db.json')
const { faker } = require('@faker-js/faker')


async function main() {
  const client = new MongoClient(mongo_uri)
  try {
    await client.connect()
    console.log('Connected successfully to server')

    const database = client.db('test')
    const collection = database.collection('users')

    await collection.insertOne({
      name: faker.person.firstName(),
      surname: faker.person.lastName(),
      age: faker.number.int({min: 18, max: 99}),
      email: faker.internet.email().toLowerCase(),
    })
    console.log('User created successfully')

  } finally {
    await client.close()
  }
}

main().catch(console.error)