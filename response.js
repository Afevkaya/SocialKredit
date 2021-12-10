class response {
    constructor(data=null,error=null){
        this.data = data;
        this.error = error;
    }

    success(res){
        return res.status(200).json({
            status:"success",
            data:this.data
        });
    }

    created(res){
        return res.status(201).json({
            status:"created",
            data:this.data
        });
    }

    error500(res){
        return res.status(500).json({
            status:"error",
            error:this.error
        });
    }

    error400(res){
        return res.status(400).json({
            status:"error",
            error:this.error
        });
    }

    notFound(res){
        return res.status(404).json({
            status:"not found",
            data:""
        });
    }
}

module.exports = response;