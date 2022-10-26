const express = require('express');
const { loginUser } = require('./controllers/login');
const { createUsers } = require('./controllers/users');
const router = express();


router.post('/users', createUsers);

router.post('/login', loginUser);





module.exports = router; 