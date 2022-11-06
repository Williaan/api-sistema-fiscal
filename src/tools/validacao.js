const yup = require('yup');
const { pt } = require('yup-locales');
const { setLocale } = require('yup');
setLocale(pt);


const validateAddClients = yup.object().shape({
    nome: yup.string().required("O campo Nome é obrigatório!"),
    email: yup.string().email().required("O campo E-mail é obrigatório!"),
    cpf: yup.string().required("O campo CPF é obrigatório").min(11),
    telefone: yup.number().required("O campo Telefone  é obrigatório")

});


const validateAddUsers = yup.object().shape({
    nome: yup.string().required("O campo Nome é obrigatório!"),
    email: yup.string().email().required("O campo E-mail é obrigatório!"),
    senha: yup.string().required("O campo Senha é obrigatório!").min(6)

});


const validateAddCharges = yup.object().shape({
    cliente_id: yup.number().strict().required("O campo ID do cliente é obrigatório!"),
    status: yup.string().required("O campo Status é obrigatório!"),
    data: yup.string().required("O campo Data é obrigatório!").min(10),
    descricao: yup.string().required("O campo Descrição é obrigatório"),
    valor: yup.number().strict().required("O campo Valor é obrigatório")

});



module.exports = {
    validateAddClients,
    validateAddUsers,
    validateAddCharges
}