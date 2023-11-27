import NewsService from '../services/news.js'

function getNews(req, res) {
    NewsService.getNews()
        .then(function (news) {
            res.status(200).json(news)
        })
        .catch(function (error) {
            res.status(400).json({ msg: error.message })
        })
}

function newsById(req, res) {
    const { idNews } = req.params
    NewsService.newsById(idNews)
        .then(function (result) {
            res.status(200).json(result)
        })
        .catch(function (error) {
            res.status(404).json({ msg: "No se encontro la noticia" })
        })
}

function createNews(req, res) {
    const newNews = req.body
    NewsService.createNews(newNews)
        .then(function (newNews) {
            res.status(201).json(newNews)
        })
        .catch(function (error) {
            res.status(400).json({ msg: error.message })
        })
}

function editNews(req, res) {
    const { idNews } = req.params
    const data = req.body
    NewsService.editNews(idNews, data)
        .then(function (result) {
            if (result === 0) {
                res.status(404).json({ msg: "No se encontro la noticia" })
            } else {
                res.status(200).json({ msg: "Se edito correctamente" })
            }
        })
}

function deleteNews(req, res) {
    const { idNews } = req.params
    NewsService.deleteNews(idNews)
        .then(function (result) {
            if (result === 0) {
                res.status(404).json({ msg: "No se encontro la noticia" })
            } else {
                res.status(200).json({ msg: "Se borro correctamente" })
            }
        })
}

export default {
    getNews,
    newsById,
    createNews,
    editNews,
    deleteNews
}