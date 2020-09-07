const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    // check json web token exists & is verified
    if (token) {
        jwt.verify(token, "net ninja secret", (err, decodedToken) => {
            if (err) {
                console.log(`Erro na autenticação${err.message}`);
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

module.exports = { requireAuth };