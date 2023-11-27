import express from 'express'
import gamesController from '../controllers/games.js'
import gameMidware from '../middlewares/games.js'
import userMidware from '../middlewares/users.js'



const route = express.Router()

route.route('/games')
    .get(gamesController.getGames)
    .post([gameMidware.validateNewGame], gamesController.createGame)

route.route('/games/:idGame')
    .get(gamesController.gameById)
    .delete([userMidware.verifySession], gamesController.deleteGame)
    .put([gameMidware.validateNewGame], gamesController.editGame)

export default route