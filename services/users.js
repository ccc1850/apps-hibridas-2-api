import { MongoClient, ObjectId } from 'mongodb'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const client = new MongoClient('mongodb://localhost:27017')
const db = client.db('dvgame')
const users = db.collection('users')
const tokens = db.collection('tokens')

async function createUser(user) {
    await client.connect()

    const userData = { ...user }

    const salt = await bcrypt.genSalt(10)
    userData.password = await bcrypt.hash(userData.password, salt)

    const result = await users.insertOne(userData)
}

async function createToken(data){
    const token = jwt.sign(data, "KEY")
    await tokens.insertOne({ token, email: data.email })
    return token
}

async function verifyUser(user) {
    await client.connect()

    const userData = await users.findOne({ email: user.email })

    if(!userData){
        throw { message: 'La cuenta no fue encontraada' }
    }

    const result = await bcrypt.compare(user.password, userData.password)
    if(!result){
        throw { message: 'La contraseña es incorrecta' }
    }
}

async function authLogin(user) {
    return { user: await verifyUser(user), token: await createToken({...user, password: undefined })  }
}

async function verifyLogin(token){
    await client.connect()
    const data = jwt.verify(token, "KEY")

    if(!await tokens.findOne({ token })){
        throw { message: 'El token no es valido' }
    }

    return data
}

async function logout(token){
    await client.connect()

    tokens.deleteOne({ token })
}

export default {
    createUser,
    authLogin,
    verifyLogin,
    logout
}