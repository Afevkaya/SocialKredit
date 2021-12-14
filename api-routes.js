const routes = require('express').Router();
const userController = require('./controllers/userController');
const userActivityController = require('./controllers/userActivityController');
const activityController = require('./controllers/activityController');
const categoryController = require('./controllers/categoryController');

const {check} = require('express-validator');

var userValidation = new Array(
    check('name').notEmpty().withMessage('Kullanıcı adı boş olamaz'),
    check('surname').notEmpty().withMessage('Kullanıcı soyadı boş olamaz'),
    check('gender').isBoolean().withMessage('Cinsiyet seçiniz'),
    check('email').notEmpty().withMessage('Email boş olmaz').isEmail().withMessage('Doğru email giriniz'),
    check('phoneNumber').notEmpty().withMessage('Telefon numarası giriniz'),
    check('birthDate').notEmpty().withMessage('Doğum tarihi boş olamaz'),
    check('password').notEmpty().withMessage('Parola boş olmaz'));


routes.route('/user').get(userController.list).post([userValidation],userController.create);
routes.route('/user/:user_id').get(userController.getById)
.put(userController.update).delete(userController.delete);

routes.route('/userActivity').get(userActivityController.list).post(userActivityController.create);
routes.route('/userActivity/:userActivity_id').get(userActivityController.getById);

routes.route('/activity').get(activityController.list).post(activityController.create);
routes.route('/activity/:activity_id').get(activityController.getById).put(activityController.update).delete(activityController.delete);

routes.route('/category').get(categoryController.list).post(categoryController.create);
routes.route('/category/:category_id').get(categoryController.getById).put(categoryController.update).delete(categoryController.delete);

routes.route('/userActivities/:user_id').get(userActivityController.getByUserId);
routes.route('/userActivities/:activity_id').get(userActivityController.getByActivityId);

routes.route('/activities/:category_id').get(activityController.getByCategoryId);
module.exports = routes;