const connection = require('./connection');


const getAll = async () => {
    // Busca o usuário pelo email
    const [rows] = await connection.execute(
        'SELECT * FROM pontos'
    );
    return rows;
};


module.exports = {
    getAll
};