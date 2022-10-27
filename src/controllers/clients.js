const connect = require('../services/connect');


const createClient = async (request, response) => {
    const { nome, email, cpf, telefone, cep, logradouro, complemento, bairro, cidade, estado } = request.body;

    if (!nome) {
        return response.status(400).json({ mensagem: "O campo Nome é obrigatório!" });

    } else if (!email) {
        return response.status(400).json({ mensagem: "O campo E-mail é obrigatório!" });

    } else if (!cpf) {
        return response.status(400).json({ mensagem: "O campo Senha é obrigatório!" });

    }

    try {
        const clientExsists = await connect.query("SELECT * FROM clientes WHERE email = $1 ", [email]);

        if (clientExsists.rowCount <= 0) {
            return response.status(400).json({ mensagem: "Cliente ja existe na base de dados!" })
        }

        const createClients = "INSERT INTO clientes (nome, email, cpf, telefone, cep, logradouro, complemento, bairro, cidade, estado) VALUES ($1,$2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *"
        const createParams = [nome, email, cpf, telefone, cep, logradouro, complemento, bairro, cidade, estado];
        const query = await connect.query(createClients, createParams);

        if (query.rowCount == 0) {
            return response.status(400).json({ mensagem: "Não foi possível cadastrar cliente!" });
        }

        return response.status(200).json(query);


    } catch (error) {
        return response.status(500).json({ mensagem: `Erro Interno: ${error.message}` });
    }




}

module.exports = {
    createClient
}