const Activity = require('../models/activity.model');
const response = require('../response');
const {validationResult} = require('express-validator');

//listeleme
exports.list = (req, res) => {
	Activity.find({}).populate('categoryBy').exec((err, activities) => {
		if (err) {
			return new response(null, err).error500(res);
		}

		return new response(activities, null).success(res);
	});
};

//Id'ye göre listeleme
exports.getById = (req, res) => {
	Activity.findById(req.params.activity_id).populate('categoryBy').exec((err, activity) => {
		if (err) {
			return new response(null, err).error500(res);
		}
		if (!activity) {
			return new response().notFound(res);
		}

		return new response(activity, null).success(res);
	});
};

exports.getByCategoryId =(req,res)=>{
	Activity.find({categoryBy:req.params.category_id}).populate("categoryBy").exec((err,categories)=>{
		if (err) {
			return new response(null,err).error500(res);
		}
		if(!categories){
			return new response().notFound(res);
		}

		return new response(categories,null).success(res);
	});
}

//oluşturma
exports.create = (req, res) => {

	let errors = validationResult(req);
	if (!errors.isEmpty()) {
		return new response(null,errors.array()).error400(res);
	}

	const { title, description, click, like, picture, categoryBy } = req.body;
	const activity = new Activity();

	activity.title = title;
	activity.description = description;
	activity.click = click;
	activity.like = like;
	activity.picture = picture;
	activity.categoryBy = categoryBy._id;

	activity.save((err) => {
		if (err) {
			return new response(null, err).error500(res);
		}
		return new response(activity, null).created(res);
	});
};

//güncelleme
exports.update = (req, res) => {
	Activity.findById(req.params.activity_id).populate('categoryBy').exec((err, activity) => {
		if (err) {
			return new response(null, err).error500(res);
		}
		if (!activity) {
			return new response().notFound(res);
		}

		const { title, description, click, like, picture, categoryBy } = req.body;

		activity.title = title;
		activity.description = description;
		activity.click = click;
		activity.like = like;
        activity.picture = picture;
		activity.categoryBy = categoryBy._id;

		activity.save((err) => {
			if (err) {
				return new response(null, err).error500();
			}
			return new response(activity, null).created(res);
		});
	});
};

//silme
exports.delete = (req, res) => {
	Activity.findByIdAndDelete({ _id: req.params.activity_id }, (err, activity) => {
		if (err) {
			return new response(null, err).error500(res);
		}
		if (!activity) {
			return new response().notFound(res);
		}

		return new response(activity, null).success(res);
	});
};
