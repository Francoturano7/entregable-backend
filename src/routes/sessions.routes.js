import { Router } from "express";
import passport from "passport";
import { config } from "../config/config.js";
import { SessionsController } from "../controller/sessions.controller.js";

export const sessionsRouter = Router();

// Rutas Registros
sessionsRouter.post("/signup", passport.authenticate("signupLocalStrategy",{
    failureRedirect:"/api/sessions/fail-signup"
}) , SessionsController.redirectLogin);

// Ruta Registro Fail
sessionsRouter.get("/fail-signup", SessionsController.failSignup);

// Ruta Solicitud Registro GitHub
sessionsRouter.get("/signup-github", passport.authenticate("signupGithubStrategy"));

// Ruta Callback Github
sessionsRouter.get(config.github.callbackUrl, passport.authenticate("signupGithubStrategy", {
    failureRedirect: "/api/sessions/fail-signup"
}), SessionsController.redirectProfile);

// Rutas Login
sessionsRouter.post("/login", passport.authenticate("loginLocalStrategy",{
    failureRedirect:"/api/sessions/fail-login"
}) , SessionsController.redirectProfile);

// Ruta Login Fail
sessionsRouter.get("/fail-login", SessionsController.failLogin);

// Ruta Logout
sessionsRouter.get("/logout", async(req,res)=>{
    try {
        req.session.destroy(err=>{
            if(err) return res.render("profileView",{error:"No se pudo cerrar la sesion"});
            res.redirect("/");
        })
    } catch (error) {
        res.render("signupView",{error:"No se pudo registrar el usuario"});
    }
});