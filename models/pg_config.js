const Pool = require('pg').Pool;

const pg_conn = new Pool (
    {
        user: 'ooanhepalixwqt',
        host: 'ec2-54-159-175-113.compute-1.amazonaws.com',
        database: 'd3ad1jmgh5j2of',
        password: 'bbec0f2fabae6181a1c7c8e6561fd87baaeefb610b3bdba315ce98c1a499024d',
        port: 5432,
        ssl: 
        {
            rejectUnauthorized: false
        },
    });

module.exports = pg_conn;