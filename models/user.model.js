const mongoose = require('mongoose');
const schema = mongoose.Schema;

// Schema oluştruduk
// Bu schema js tarafında model
// Mongo tarafında veritabanı collection karşılık gelmektedir
// Hem model hem veritabanı collection hem model.
// C# da DbContext gibi
var userSchema = new schema({
    name:{
        type:String,
        required:true
    },
    surname:{
        type:String,
        required:true
    },
    gender:{
        type:Boolean,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    birthDate:{
        type:Date,
        required:true
    },
    point:{
        type:Number,
        default:0
    },
    password:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model("User",userSchema);
