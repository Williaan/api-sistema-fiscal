const express = require('express');
const { createCobrancas } = require('./controllers/charges');
const { createClient, updateClient, listClients, readClient } = require('./controllers/clients');
const { loginUser } = require('./controllers/login');
const { createUsers, updateUsers, listUsers } = require('./controllers/users');
const filterAuthentication = require('./middleware/autenticacao');

const router = express();


router.post('/usuarios', createUsers);
router.post('/login', loginUser);

router.use(filterAuthentication);

router.put('/usuarios/:id', updateUsers);
router.get('/usuarios', listUsers);

router.post('/clientes', createClient);
router.get('/clientes', listClients);
router.get('/clientes/:id', readClient)
router.put('/clientes/:id', updateClient);


router.post('/cobrancas/', createCobrancas);



module.exports = router; 