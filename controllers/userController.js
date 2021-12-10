const User = require('../models/user.model');
const response = require('../response');

//listeleme
exports.list = (req,res)=>{
    User.find({},(err,users)=>{
        if (err) {
            return new response(null,err).error500(res);
        }

        return new response(users,null).success(res);
    });
}

//Id ye göre listeleme
exports.getById = (req,res)=>{
    User.findById(req.params.user_id,(err,user)=>{
        if(err){
            return new response(null,err).error500(res);
        }
        if(!user){
            return new response().notFound(res);
        }

        return new response(user,null).success(res);
    });
}

//oluşturma
exports.create = (req,res)=>{
    const{name,surname,gender,email,phoneNumber,birthDate,point,password} = req.body;
    const user = new User();

    user.name = name;
    user.surname = surname;
    user.gender = gender;
    user.email = email;
    user.phoneNumber = phoneNumber;
    user.birthDate = birthDate;
    user.point = point;
    user.password = password;

    user.save((err)=>{
        if (err) {
            return new response(null,err).error500(res);
        }

        return new response(user,null).created(res);
    });
}

//güncellme
exports.update = (req,res) => {
    User.findById(req.params.user_id,(err,user)=>{
        if (err) {
            return new response(null,err).error500();
        }
        if(!user){
            return new response().notFound(res);
        }

        user.name = req.body.name;
        user.surname = req.body.surname;
        user.gender = req.body.gender;
        user.email=req.body.email;
        user.phoneNumber = req.body.phoneNumber;
        user.birthDate = req.body.birthDate;
        user.point = req.body.point;
        user.password = req.body.password;

        user.save((err)=>{
            if(err){
                return new response(null,err).error500(res);
            }
            return new response(user,null).success(res);
        });
    });
}

//silme
exports.delete = (req,res)=>{
    User.findByIdAndDelete({_id:req.params.user_id},(err,user)=>{
        if (err) {
            return new response(null,err).error500(res);
        }
        if (!user) {
            return new response().notFound(res);
        }

        return new response(user,null).success(res);
    });
}