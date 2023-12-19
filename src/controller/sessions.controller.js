export class SessionsController{
    static redirectLogin = async(req,res) => {
        // res.render("loginView",{message:"Usuario registrado correctamente"});
        res.redirect("/login");
    };

    static failSignup = (req,res) => {
        res.render("signupView", {error:"No se pudo registrar el usuario"});
    };

    static redirectProfile = async(req,res)=>{
        res.redirect("/profile");
    };

    static failLogin = (req,res) => {
        res.render("loginView",{error:"No se pudo iniciar sesion para este usuario"});
    };
};