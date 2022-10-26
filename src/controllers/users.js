const connect = require('../services/connect');
const bcrypt = require('bcrypt');


const createUsers = async (request, response) => {
    const { nome, email, senha } = request.body;

    if (!nome) {
        return response.status(400).json({ mensagem: "O campo Nome é obrigatório!" });

    } else if (!email) {
        return response.status(400).json({ mensagem: "O campo E-mail é obrigatório!" });

    } else if (!senha) {
        return response.status(400).json({ mensagem: "O campo Senha é obrigatório!" });

    } else if (senha.length < 6) {
        return response.status(400).json({ mensagem: "A senha precisa ser maior ou igual a 6 caracteres!" });
    }


    try {
        const existeEmail = await connect.query("SELECT * FROM usuarios WHERE email = $1", [email]);
        if (existeEmail.rowCount > 0) {
            return response.status(400).json({ mensagem: "O e-mail já existe na base de dados!" });
        }

        const senhaHash = await bcrypt.hash(senha, 10);

        const createUser = await connect.query("INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING *", [nome, email, senhaHash]);
        if (createUser.rowCount == 0) {
            return response.status(400).json({ mensagem: "Não foi possível cadastrar usuário!" });
        }

        const { senha: senha_, ...dadosUsuario } = createUser.rows[0];

        return response.status(200).json(dadosUsuario)


    } catch (error) {
        return response.status(500).json({ mensagem: `Erro Interno: ${error.message}` });
    }


}


module.exports = {
    createUsers
}
