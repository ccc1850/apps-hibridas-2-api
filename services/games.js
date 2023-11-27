import { MongoClient, ObjectId } from "mongodb"

const client = new MongoClient('mongodb://127.0.0.1:27017')
const db = client.db("dvgame")

const gameCollection = db.collection('games')

async function getGames() {
    await client.connect()
    const games = await gameCollection.find().toArray()
    return games
}

async function gameById(id) {
  await client.connect()
  const game = await gameCollection.findOne({_id: new ObjectId(id)})
  return game
}

async function createGame(game) {
    await client.connect()

    const newGame = {...game}
    await gameCollection.insertOne(newGame)

    return newGame
}

async function deleteGame(id) {
    await client.connect()

    const result = await gameCollection.deleteOne({_id: new ObjectId(id)})

    return result.deletedCount
}

async function editGame(id, data) {
    await client.connect()

    const result = await gameCollection.updateOne({_id: new ObjectId(id)}, {$set: data})
        .then(function (result) {
            if(data.name) {
                const game = gameCollection.findOne({_id: new ObjectId(id)})
                return result.modifiedCount
            }
            return result.modifiedCount
        })
}




export default {
    getGames,
    gameById,
    createGame,
    deleteGame,
    editGame
}