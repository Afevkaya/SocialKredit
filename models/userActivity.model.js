const mongoose = require('mongoose');
const userModel = require('./user.model');
const activityModel = require('./activity.model');

var userActivitySchema = mongoose.Schema({
    userBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    activityBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Activity"
    }
});

module.exports = mongoose.model('UserActivity',userActivitySchema);

