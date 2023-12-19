import passport from "passport";
import localStrategy from "passport-local"; 

// Se creará el hash y la clave se guardará con HASH, más seguro
import { createHash, inValidPassword } from "../utils.js";

import { config } from "./config.js";
import GithubStrategy from "passport-github2"

import { usersService } from "../dao/index.js";

import { logger } from "../helpers/logger.js";

export const initializePassport = () => {
    // Estrategia para registrar usuarios nuevos
    passport.use("signupLocalStrategy", new localStrategy(
        {  //Para trabajar con otros datos
            passReqToCallback: true, //Acceso a objeto request
            usernameField: "email", //El campo UserName ahora es Email
        },
        async (req, username, password, done) => {
            const {first_name, last_name, age} = req.body;
            try {
                // Buscar el email
                const user = await usersService.getUserByEmail(username); 
                if(user){
                    // Usuario ya registrado
                    return done(null, false)
                } else {
                    const newUser = {
                        first_name, 
                        last_name,
                        age,
                        email: username, 
                        password: createHash(password)
                    };
                    logger.informativo(newUser);
                    const userCreated = await usersService.createUser(newUser)
                            // El done (hubo errores?, nuevo user)
                    return done(null, userCreated)
                }
            } catch (error) {
                return done(error)
            }
        }
    ));

    // Estrategia para login de usuarios
    passport.use("loginLocalStrategy", new localStrategy(
        { 
            usernameField: "email", //El campo UserName = Email
        },
        async (username, password, done) => {
            try {
                const user = await usersService.getUserByEmail(username)
                if(!user){
                    // El usuario no está registrado
                    return done(null, false)
                } 
                if(!inValidPassword(password, user)){
                    return done(null, false);
                }
                //Validamos que el usuario existe y la password es correct
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    ));

    // Estrategia para registrar con GitHub
    passport.use("signupGithubStrategy", new GithubStrategy (
        {
            clientID: config.github.clientId,
            clientSecret: config.github.clientSecret,
            callbackURL: `http://localhost:8080/api/sessions${config.github.callbackUrl}`
        },
        async(accessToken, refreshToken, profile, done) => {
            try {
                // console.log("profile", profile);
                const user = await usersModel.findOne({email: profile.username});
                if(user){ // Si ya está registrado
                    return done(null, user)
                } else { // Si no está registrado
                    const newUser = {
                        first_name: profile.displayName,
                        email: profile.username, 
                        password: createHash(profile.id) // Cualquier dato, por cumplir
                    };
                    logger.informativo(newUser);
                    const userCreated = await usersModel.create(newUser);
                            // El done (hubo errores?, nuevo user)
                    return done(null, userCreated)
                }
            } catch (error) {
                return done(error);
            }
        }
    ));

    // Serializers
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

        //  El SV recibe a cookie, obtiene su valor, extrae la ID del usuario
        // Busca la ID en la BD, y queda guardado en req.user
    passport.deserializeUser(async (id, done) => {
        const user = await usersService.getUserById(id);
        done(null, user); //req.user = info del usuario que traemos de BD
    });
}
