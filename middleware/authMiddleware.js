const jwt = require("jsonwebtoken");
const User = require("../models/User");

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    // check json web token exists & is verified
    if (token) {
        jwt.verify(token, "net ninja secret", (err, decodedToken) => {
            if (err) {
                console.log(`Erro na autenticação ${err.message}`);
                res.redirect("/login");
            } else {
                console.log(decodedToken);
                next();
            }
        });
    } else {
        // Se não estiver autenticado, volta para a tela de login
        console.log('Não logado - Faça o login')
        res.redirect("/login");
    }
};

// Check current user
const checkUser = (req, res, next) => {

    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, "net ninja secret", async(err, decodedToken) => {

            if (err) {
                console.log(`Erro na autenticação ${err.message}`);
                res.locals.user = null;
                next();
            } else {
                try {
                    console.log(decodedToken);
                    let user = await User.findById(decodedToken.id);
                    console.log(user);
                    res.locals.user = user;
                    next();

                } catch (err) {
                    console.log(err);
                }

            }
        });
    } else {
        res.locals.user = null;
        next();

    }
}

module.exports = { requireAuth, checkUser };