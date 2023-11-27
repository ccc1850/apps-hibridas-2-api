import express from 'express'
import userController from '../controllers/users.js'
import authValidation from '../middlewares/users.js'

const route = express.Router()

route.route('/register')
    .post([authValidation.validateUser], userController.Register)

route.route('/login')
    .post([authValidation.validateUser], userController.Login)
    .delete([authValidation.verifySession], userController.Logout)

route.route('/auth/verify')
    .post(userController.Verify)

export default route