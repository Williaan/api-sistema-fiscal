const connect = require('../services/connect');
const secretKey = require('../utils/secretKey');
const jwt = require('jsonwebtoken');


const filterAuthentication = async (request, response, next) => {
    const { authorization } = request.headers;

    if (!authorization) {
        return response.status(401).json({ mensagem: "Erro de autenticação!" })
    }

    try {
        const token = authorization.replace('Bearer ', '').trim();

        const { id } = jwt.verify(token, secretKey);

        const { rowCount, rows } = await connect.query("SELECT * FROM usuarios WHERE id = $1", [id]);

        if (rowCount <= 0) {
            return response.status(401).json({ mansagem: "Erro de autenticação." });
        }

        const [usuario] = rows;

        const { senha: senha_, ...dadosUsuario } = usuario;

        request.usuario = dadosUsuario;

        next();

    } catch (error) {
        return response.status(500).json({ mansagem: `Erro interno: ${error.message}` });
    }

}

module.exports = filterAuthentication;