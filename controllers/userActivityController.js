const UserActivity = require('../models/userActivity.model');
const response = require ('../response.js');


//listeleme
exports.list = (req,res)=>{
    UserActivity.find({}).sort({created:-1}).populate(['userBy','activityBy']).exec((err,userActivities)=>{
        if(err){
            return new response(null,err).error500(res);
        }
        return new response(userActivities,null).success(res);
    });
}

//Id'ye göre getirme
exports.getById = (req,res)=>{
    UserActivity.findById(req.params.userActivity_id).populate(["userBy","activityBy"]).exec((err,userActivity)=>{
        
        if (err) {
            return new response(null,err).error500(res);
        }
        if(!userActivity){
            return new response().notFound();
        }
        console.log("Success");
        return new response(userActivity,null).success(res);
    });
}

//User ID ye göre getirme
exports.getByUserId = (req,res)=>{
    UserActivity.find({userBy:req.params.user_id}).populate(["userBy","activityBy"]).exec((err,userActivity)=>{
        console.log(userActivity);
        if (err) {
            return new response(null,err).error500(res);
        }
        if (!userActivity) {
            return new response().notFound(res);
        }

        return new response(userActivity,err).success(res);
    });
}

//Acitivity Id ye göre getirme 
exports.getByActivityId = (req,res)=>{
    UserActivity.find({activityBy:req.params.activity_id}).populate(["activityBy","userBy"]).exec((err,userActivity)=>{
        if (err) {
            return new response(null,err).error500(res);
        }

        if (!userActivity) {
            return new response().notFound(res);
        }

        return new response(userActivity,err).success(res);
    });
}

//oluşturma
exports.create = (req,res)=>{
    const {userBy,activityBy} = req.body;
    const userActivity = new UserActivity();

    userActivity.userBy = userBy._id;
    userActivity.activityBy = activityBy._id;

    userActivity.save((err)=>{
        if (err) {
            return new response(null,err).error500(res);
        }

        return new response(userActivity,null).created(res);
    });
}