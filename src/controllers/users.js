const connect = require('../services/connect');
const bcrypt = require('bcrypt');
const { validateAddUsers } = require('../tools/validacao');



const createUsers = async (request, response) => {
    const { nome, email, senha } = request.body;

    try {
        await validateAddUsers.validate(request.body);

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


const updateUsers = async (request, response) => {
    const { nome, email, senha } = request.body;
    const { usuario } = request;

    try {
        await validateAddUsers.validate(request.body);

        const usuarioEncontrado = await connect.query("SELECT * FROM usuarios WHERE email = $1", [email]);

        if (usuario.rowCount > 0 && usuarioEncontrado.rows[0].id !== usuario.id) {
            return response.status(400).json({ mensagem: "E-mail já existe na base de dados!" });
        }


        const senhaHash = await bcrypt.hash(senha, 10);

        const atualizaCadastro = await connect.query("UPDATE usuarios SET nome = $1, email = $2, senha = $3 WHERE id = $4", [nome, email, senhaHash, usuario.id])

        if (atualizaCadastro.rowCount <= 0) {
            return response.status(400).json({ mensagem: "Usuario não atualizado" });
        }

        return response.status(204).send();


    } catch (error) {
        return response.status(500).json({ mensagem: `Erro Interno: ${error.message}` });

    }
}

const listUsers = async (request, response) => {
    const { usuario } = request;

    try {
        return response.status(200).json(usuario);

    } catch (error) {
        return response.status(500).json({ mensagem: `Erro Interno: ${error.message}` });
    }

}

module.exports = {
    createUsers,
    updateUsers,
    listUsers
}
