const routes = require('express').Router();
const userController = require('./controllers/userController');
const userActivityController = require('./controllers/userActivityController');
const activityController = require('./controllers/activityController');
const categoryController = require('./controllers/categoryController');

routes.route('/user').get(userController.list).post(userController.create);
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