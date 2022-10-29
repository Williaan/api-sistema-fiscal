const connect = require('../services/connect');

const createCobrancas = async (request, response) => {
    let { cliente_id, status, vencimento } = request.body;

    if (!cliente_id) {
        return response.status(400).json({ mensagem: "O campo ID do cliente é obrigatório!" });

    } else if (!status) {
        return response.status(400).json({ mensagem: "O campo Status é obrigatório!" });

    } else if (!vencimento) {
        return response.status(400).json({ mensagem: "O campo Vencimento é obrigatório!" });

    }

    try {
        const clientExists = await connect.query("SELECT * FROM cobrancas WHERE cliente_id = $1", [cliente_id]);
        if (clientExists.rowCount == 0) {
            return response.status(400).json({ mensagem: "Cliente não foi encontrado na base dados!" });
        }

        const createCobranca = await connect.query("INSERT INTO cobrancas (cliente_id, status, data) VALUES ($1, $2, $3)", [cliente_id, status, vencimento]);
        if (createCobranca.rowCount == 0) {
            return response.status(400).json({ mensagem: "Cobrança não foi cadastrada!" });
        }

        let [cliente] = createCobranca.rows;


        return response.status(200).json(cliente);

    } catch (error) {
        return response.status(500).json({ mensagem: `Erro interno: ${error.message}` });
    }

}


module.exports = {
    createCobrancas
}