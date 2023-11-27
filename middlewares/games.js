import { gameValidation } from '../schemas/games.js'
import userServices from '../services/users.js'

function validateNewGame(req, res, next) {

    const token = req.headers['authorization']
    if (!token) {
        return res.status(401).json({ msg: 'No se encuentra el token' })
    }
    
    const user = userServices.verifyLogin(token)
    if (!user) {
        return res.status(401).json({ msg: 'No tienes permiso para hacer esta accion' })
    }

    const newGame = req.body
    gameValidation.validate(newGame)
        .then(function(){
            next()
        })
        .catch(function(err){
            res.status(400).json({ msg: "Revisa los campos del formulario" })
        })
}

export default {
    validateNewGame
}