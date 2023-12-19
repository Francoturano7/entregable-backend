// roles = ["admin"]

export const checkRole = (roles) => {
    return (req, res, next) => {
        console.log(req.user);
        if(!roles.includes(req.user.role)){
            res.json({status: "error", message: "No tienes acceso"})
        } else {
            next();
        }
    }
};

export const isAuth = (req, res, next) => {
    if(!req.user){
        res.json({status:"Error", message:"Debes estar autenticado"})
    } else {
        next();
    }
}