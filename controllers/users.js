import userServices from '../services/users.js'

function Register(req, res) {
    const user = req.body
    userServices.createUser(user)
        .then((data) => {
            res.status(201).json(data)
        })
        .catch((err) => {
            res.status(400).json(err)
        })
}

const Login = (req, res) => {
    const user = req.body
    userServices.authLogin(user)
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            res.status(400).json(err)
        })
}

const Logout = (req, res) => {
    const token = req.token
    userServices.logout(token)
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            res.status(400).json(err)
        })
}

const Verify = (req, res) => {
    const token = req.headers['authorization']
    userServices.verifyLogin(token)
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            res.status(404).json(err)
        })
}

export default {
    Register,
    Login,
    Logout,
    Verify
}