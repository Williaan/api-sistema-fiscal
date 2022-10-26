const connect = require('../services/connect');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const keySecret = require('../utils/secretKey');


const loginUser = async (request, response) => {
    const { email, senha } = request.body;

    if (!email || !senha) {
        return response.status(404).json({ mansagem: "E-mail ou senha são obrigatótrios." });

    }

    try {
        const usuarioExiste = await connect.query("SELECT * FROM usuarios WHERE email = $1", [email]);

        if (!usuarioExiste.rowCount <= 0) {
            return response.status(404).json({ mansagem: "E-mail ou senha estão incorretos." });
        }

        const [usuario] = usuarioExiste.rows;

        const compareSenha = await bcrypt.compare(senha, usuario.senha)




    } catch (error) {
        return response.status(500).json({ mansagem: `Erro interno: ${error.message}` });
    }
}

module.exports = {
    loginUser
}