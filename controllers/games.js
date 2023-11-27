import gameService from '../services/games.js'

function getGames(req, res) {
    gameService.getGames()
        .then(function (games) {
            res.status(200).json(games)
        })
        .catch(function (error) {
            res.status(400).json({ msg: error.message })
        })
}

function gameById(req, res) {
    const { idGame } = req.params
    gameService
        .gameById(idGame)
        .then(function (result) {
            res.status(200).json(result)
        })
        .catch(function (error) {
            res.status(404).json({ msg: "No se encontro el juego" })
        })
}

function createGame(req, res) {
    const newGame = req.body
    gameService.createGame(newGame)
        .then(function (newGame) {
            res.status(201).json(newGame)
        })
        .catch(function (error) {
            res.status(400).json({ msg: error.message })
        })
}

function deleteGame(req, res) {
    const { idGame } = req.params
    gameService.deleteGame(idGame)
        .then(function (result) {
            if (result === 0) {
                res.status(404).json({ msg: "No se encontro el juego" })
            } else {
                res.status(200).json({ msg: "Se borro correctamente" })
            }
        })
}

function editGame(req, res) {
    const { idGame } = req.params
    const data = req.body
    gameService.editGame(idGame, data)
        .then(function (result) {
            if (result === 0) {
                res.status(404).json({ msg: "No se encontro el juego" })
            } else {
                res.status(200).json({ msg: "Se edito correctamente" })
            }
        })
}

export default {
    getGames,
    gameById,
    createGame,
    deleteGame,
    editGame
}