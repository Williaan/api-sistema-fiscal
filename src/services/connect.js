const { Pool } = require('pg');

const pool = new Pool({
    host: 'ec2-44-194-92-192.compute-1.amazonaws.com',
    port: 5432,
    user: 'tzkujbwjrknjoi',
    password: 'd9a3c581aa567ab3859cbaba21aae226a0f0a24c599fb2c5705ac19cd0fc0d85',
    database: 'dbrldm1n01keid'

});


const query = (text, param) => {
    return pool.query(text, param);
}


module.exports = {
    query: query
};


//CONFIGURAÇÕES HEROKU

// Host
// ec2-44-194-92-192.compute-1.amazonaws.com
// Database
// dbrldm1n01keid
// User
// tzkujbwjrknjoi
// Port
// 5432
// Password
// d9a3c581aa567ab3859cbaba21aae226a0f0a24c599fb2c5705ac19cd0fc0d85