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
        const clientExists = await connect.query("SELECT * FROM clientes WHERE email = $1 OR cpf = $2", [email, cpf]);

        if (clientExists.rowCount > 0) {
            return response.status(400).json({ mensagem: "E-mail ou CPF ja existe na base de dados" });
        }

        const createClients = "INSERT INTO clientes (nome, email, cpf, telefone, cep, logradouro, complemento, bairro, cidade, estado) VALUES ($1,$2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *"
        const createParams = [nome, email, cpf, telefone, cep, logradouro, complemento, bairro, cidade, estado];
        const query = await connect.query(createClients, createParams);

        if (query.rowCount == 0) {
            return response.status(400).json({ mensagem: "Não foi possível cadastrar o cliente!" });
        }

        return response.status(200).json(query.rows);


    } catch (error) {
        return response.status(500).json({ mensagem: `Erro Interno: ${error.message}` });
    }

}


const listClients = async (request, response) => {

    try {
        const listClients = await connect.query("SELECT nome, email, cpf, telefone, status FROM clientes INNER JOIN cobrancas ON cliente_id = cliente_id");

        return response.status(200).json(listClients.rows);


    } catch (error) {
        return response.status(500).json({ mensagem: `Erro Interno: ${error.message}` });
    }
}


const readClient = async (request, response) => {
    const { id } = request.params;

    try {
        const clientExists = await connect.query("SELECT * FROM clientes WHERE id = $1", [id]);

        if (clientExists.rowCount == 0) {
            return response.status(400).json({ mensagem: "Cliente inexistente!" });
        }

        const { ...dadosDoCliente } = clientExists.rows[0];


        const cobrancas = await connect.query("SELECT * FROM cobrancas WHERE cliente_id = $1", [dadosDoCliente.id]);

        const { ...dadosDaCobranca } = cobrancas.rows[0];

        return response.status(200).json({
            Cliente: dadosDoCliente,
            Cobrancas: dadosDaCobranca

        });


    } catch (error) {
        return response.status(500).json({ mensagem: `Erro Interno: ${error.message}` });
    }

}


const updateClient = async (request, response) => {
    const { nome, email, cpf, telefone, cep, logradouro, complemento, bairro, cidade, estado } = request.body;
    const { id } = request.params;


    if (!nome) {
        return response.status(400).json({ mensagem: "O campo Nome é obrigatório!" });

    } else if (!email) {
        return response.status(400).json({ mensagem: "O campo E-mail é obrigatório!" });

    } else if (!cpf) {
        return response.status(400).json({ mensagem: "O campo Senha é obrigatório!" });

    }

    try {
        const clientExists = await connect.query("SELECT * FROM clientes WHERE email = $1 OR cpf = $2", [email, cpf]);

        if (clientExists.rowCount > 0) {
            return response.status(400).json({ mensagem: "E-mail ou CPF ja existe na base de dados" });
        }

        const updateClient = "UPDATE clientes SET nome = $1, email = $2, cpf = $3, telefone = $4, cep = $5, logradouro = $6, complemento = $7, bairro = $8, cidade = $9, estado = $10 WHERE id = $11";
        const updateParams = [nome, email, cpf, telefone, cep, logradouro, complemento, bairro, cidade, estado, id];
        const query = await connect.query(updateClient, updateParams);

        if (query.rowCount <= 0) {
            return response.status(500).json({ mensagem: `Erro Interno: ${error.message}` });
        }

        return response.status(204).json(query.rows);


    } catch (error) {
        return response.status(500).json({ mensagem: `Erro Interno: ${error.message}` });
    }


}



module.exports = {
    createClient,
    listClients,
    readClient,
    updateClient,

}


