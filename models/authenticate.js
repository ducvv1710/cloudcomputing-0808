var pg_conn = require('./pg_config');

async function authen(user, pass)
{
    var authenticate = false;
    var acc_query = 
    {
        text: 'SELECT * FROM account WHERE account_name = $1 AND account_password = $2',
        values: [user, pass]
    };
    
    var query_data = await pg_conn.query(acc_query);
    console.log(query_data);

    if(query_data.rows.length == 1)
    {
        authenticate = true;
    }
    console.log(authenticate);
    return authenticate;
}

module.exports = authen;