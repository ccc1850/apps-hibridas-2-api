import { userValidation } from "../schemas/users.js"
import userServices from '../services/users.js'

function validateUser(req, res, next){
    const { body } = req
    userValidation.validate(body)
        .then(function(){
            next()
        })
        .catch(function(err){
            res.status(400).json({ msg: "Hubo un error iniciando tu sesion" })
        })
}

function verifySession(req, res, next){
    const token = req.headers['authorization']
    if(!token){
        return res.status(401).json({ msg: 'No se encuentra el token' })
    }

    userServices.verifyLogin(token)
        .then(function(data){
            req.session = data
            req.token = token
            next()
        })
        .catch(function(err){
            res.status(401).json({ msg: "El token de acceso no es valido"})
        })
}

export default {
    validateUser,
    verifySession
}