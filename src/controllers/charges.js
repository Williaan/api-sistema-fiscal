const connect = require('../services/connect');

const createCobrancas = async (request, response) => {
    let { cliente_id, status, data, descricao, valor } = request.body;

    if (!cliente_id) {
        return response.status(400).json({ mensagem: "O campo ID do cliente é obrigatório!" });

    } else if (!status) {
        return response.status(400).json({ mensagem: "O campo Status é obrigatório!" });

    } else if (!data) {
        return response.status(400).json({ mensagem: "O campo data é obrigatório!" });

    } else if (!descricao) {
        return response.status(400).json({ mensagem: "O campo descrição é obrigatório!" });

    } else if (!valor) {
        return response.status(400).json({ mensagem: "O campo valor é obrigatório!" });

    }

    try {
        const clientExists = await connect.query("SELECT * FROM cobrancas WHERE cliente_id = $1", [cliente_id]);
        if (clientExists.length === 0) {
            return response.status(400).json({ mensagem: "Cliente não foi encontrado na base dados!" });
        }

        const createCobranca = await connect.query("INSERT INTO cobrancas (cliente_id, status, data, descricao, valor) VALUES ($1, $2, $3, $4, $5) RETURNING *", [cliente_id, status, data, descricao, valor]);
        if (createCobranca.rowCount == 0) {
            return response.status(400).json({ mensagem: "Cobrança não foi cadastrada!" });
        }

        let [cliente] = createCobranca.rows;


        return response.status(200).json(cliente);

    } catch (error) {
        return response.status(500).json({ mensagem: `Erro interno: ${error.message}` });
    }

}


const listCobrancas = async (request, response) => {

    try {
        const listCobranca = await connect.query("SELECT nome, cliente_id, status, data, descricao, valor FROM cobrancas INNER JOIN clientes ON cliente_id = cliente_id");

        return response.status(200).json(listCobranca.rows);



    } catch (error) {
        return response.status(500).json({ mensagem: `Erro interno: ${error.message}` });
    }
}


const updateCobrancas = async (request, response) => {
    let { cliente_id, status, data, descricao, valor } = request.body;
    const { id } = request.params;

    if (!cliente_id) {
        return response.status(400).json({ mensagem: "O campo ID do cliente é obrigatório!" });

    } else if (!status) {
        return response.status(400).json({ mensagem: "O campo Status é obrigatório!" });

    } else if (!data) {
        return response.status(400).json({ mensagem: "O campo data é obrigatório!" });

    } else if (!descricao) {
        return response.status(400).json({ mensagem: "O campo descrição é obrigatório!" });

    } else if (!valor) {
        return response.status(400).json({ mensagem: "O campo valor é obrigatório!" });

    }

    try {
        const clientExists = await connect.query("SELECT * FROM cobrancas WHERE cliente_id = $1", [id]);
        if (clientExists.rowCount == 0) {
            return response.status(400).json({ mensagem: "Cliente não foi encontrado na base dados!" });
        }

        const updateCobranca = await connect.query("UPDATE cobrancas SET status = $1, data = $2, descricao = $3, valor = $4 WHERE cliente_id = $5", [status, data, descricao, valor, cliente_id])

        if (updateCobranca.rowCount == 0) {
            return response.status(400).json({ mensagem: "Cobrança não foi atualizada!" });
        }

        const [cobranca] = updateCobranca.rows;

        return response.status(200).json(cobranca)

    } catch (error) {
        return response.status(500).json({ mensagem: `Erro interno: ${error.message}` });
    }


}


const detailCobrancas = async (request, response) => {
    const { id } = request.params;

    try {
        const clientExists = await connect.query("SELECT * FROM cobrancas WHERE cliente_id = $1", [id])
        if (clientExists.rowCount == 0) {
            return response.status(400).json({ mensagem: "Cliente não foi encontrado na base dados!" });
        }

        const detailCobranca = await connect.query("SELECT * FROM cobrancas");

        return response.status(200).json(detailCobranca.rows[0]);

    } catch (error) {
        return response.status(500).json({ mensagem: `Erro interno: ${error.message}` });
    }
}

const deleteCobrancas = async (request, response) => {
    const { id } = request.params;

    try {
        const clientExists = await connect.query("SELECT * FROM cobrancas WHERE cliente_id = $1", [id]);
        if (clientExists.rowCount == 0) {
            return response.status(400).json({ mensagem: "Cliente não foi encontrado na base dados!" });
        }

        const deleteCobranca = connect.query("DELETE FROM cobrancas WHERE cliente_id = $1", [id]);

        if (deleteCobranca == 0) {
            return response.status(400).json({ mensagem: "Cobrança não deletada" })
        }

        return response.status(200).json('Excluído com sucesso!');

    } catch (error) {
        return response.status(500).json({ mensagem: `Erro interno: ${error.message}` });
    }

}



module.exports = {
    createCobrancas,
    listCobrancas,
    updateCobrancas,
    detailCobrancas,
    deleteCobrancas

}
