import { MongoClient, ObjectId } from "mongodb"

const client = new MongoClient('mongodb://127.0.0.1:27017')
const db = client.db("dvgame")

const newsCollection = db.collection('news')

async function getNews() {
    await client.connect()
    const news = await newsCollection.find().toArray()
    return news
}

async function newsById(id) {
  await client.connect()
  const news = await newsCollection.findOne({_id: new ObjectId(id)})
  return news
}

async function createNews(news) {
    await client.connect()

    const newNews = {...news}
    await newsCollection.insertOne(newNews)

    return newNews
}

async function editNews(id, data) {
    await client.connect()

    const result = await newsCollection.updateOne({_id: new ObjectId(id)}, {$set: data})
        .then(function (result) {
            if(data.title) {
                const news = newsCollection.findOne({_id: new ObjectId(id)})
                return result.modifiedCount
            }
            return result.modifiedCount
        })
}

async function deleteNews(id) {
    await client.connect()

    const result = await newsCollection.deleteOne({_id: new ObjectId(id)})

    return result.deletedCount
}

export default {
    getNews,
    newsById,
    createNews,
    editNews,
    deleteNews
}