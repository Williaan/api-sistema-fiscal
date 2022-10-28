const express = require('express');
const { createClient, updateClient } = require('./controllers/clients');
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
router.put('/clientes/:id', updateClient);





module.exports = router; 