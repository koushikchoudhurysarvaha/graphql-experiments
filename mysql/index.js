const mysql = require("mysql2/promise");

let pool;

const init = async () => {
    pool = mysql.createPool({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'koushik',
        password: process.env.DB_PASS || 'ThisisallM!',
        database: process.env.DB_NAME || 'gdb'
    });
    console.log("Pool Created");
};

const connect = async () => {
    return new Promise(
        (R, J) => pool.getConnection()
                        .then(connection => R(connection))
                        .catch(err => J(err))
    );
};

const query = async (q) => {
    console.log(q)
    const connection = await connect();
    const result = await connection.execute(q);
    connection.release();
    return result;
}

module.exports = {
    init,
    connect,
    query
}
