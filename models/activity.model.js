const mongoose = require('mongoose');
const Category = require('./category.model');

var activitySchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    click:{
        type:Number,
        default:0
    },
    like:{
        type:Number,
        default:0
    },
    picture:{
        type:String,
        required:true
    },
    categoryBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    }
});

module.exports = mongoose.model("Activity",activitySchema);