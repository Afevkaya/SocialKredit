const Category = require('../models/category.model');
const response = require('../response');
const {validationResult} = require('express-validator');


//listeleme
exports.list = (req,res)=>{
    Category.find({},(err,categories)=>{
        if (err) {
            return new response(null,err).error500(res);
        }

        return new response(categories,null).success(res);
    });
}

//Id'ye göre listeleme
exports.getById = (req,res)=>{
    Category.findById(req.params.category_id,(err,category)=>{
        if (err) {
            return new response(null,err).error500(res);
        }

        if(!category){
            return new response().notFound(res);
        }
        return new response(category,null).success(res);
    });
}

//oluşturma
exports.create =(req,res)=>{

    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return new response(null,errors.array()).error400(res);
    }

    const{name} = req.body;
    const category = new Category();

    category.name = name;

    category.save((err)=>{
        if (err) {
            return new response(null,err).error500(res);
        }

        return new response(category,null).created(res);
    });
}

//güncelleme
exports.update = (req,res)=>{
    Category.findById(req.params.category_id,(err,category)=>{
        if (err) {
            return new response(null,err).error500(res);
        }

        if(!category){
            return new response().notFound(res);
        }

        const{name} = req.body;
        category.name = name;

        category.save((err)=>{
            if (err) {
                return new response(null,err).error500(res);
            }

            return new response(category,null).success(res);
        })
    });
}

//delete
exports.delete =(req,res)=>{
    Category.findByIdAndDelete({_id:req.params.category_id},(err,category)=>{
        if (err) {
            return new response(null,err).error500(res);
        }
        if (!category) {
            return new response().notFound(res);
        }

        return new response(category,null).success(res);
    });
}