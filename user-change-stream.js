const {MongoClient} = require('mongodb')
const {mongo_uri, db, collection_name} = require('./db.json')

async function handle(client) {
  const database = client.db("test")
  const collection = database.collection('users')

  const changeStream = collection.watch([])

  try {
    while (await changeStream.hasNext()) {
      const next = await changeStream.next()
      console.log(next)
    }
  } catch (error) {
    throw error
  } finally {
    if (!changeStream.closed) {
      await changeStream.close()
    }
  }

  changeStream.on('change', next => {
    console.log(next)
  })
}

async function main() {
  const client = new MongoClient(mongo_uri)

  try {
    await client.connect()
    console.log('Connected successfully to server')

    await handle(client)
  } finally {
    await client.close()
  }
}

main().catch(console.error)