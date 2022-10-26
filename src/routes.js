const express = require('express');
const { createClient } = require('./controllers/clients');
const { loginUser } = require('./controllers/login');
const { createUsers } = require('./controllers/users');
const router = express();


router.post('/users', createUsers);
router.post('/login', loginUser);


router.post('/clientes', createClient);




module.exports = router; 