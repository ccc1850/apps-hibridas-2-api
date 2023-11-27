import express from 'express'
import newsController from '../controllers/news.js'
import newsMidware from '../middlewares/news.js'
import userMidware from '../middlewares/users.js'


const route = express.Router()

route.route('/news')
    .get(newsController.getNews)
    .post([newsMidware.validateNews], newsController.createNews)

route.route('/news/:idNews')
    .get(newsController.newsById)
    .put([newsMidware.validateNews], newsController.editNews)
    .delete([userMidware.verifySession], newsController.deleteNews)


export default route