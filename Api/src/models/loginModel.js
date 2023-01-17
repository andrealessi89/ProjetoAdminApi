const connection = require('./connection');
const bcrypt = require('bcrypt');


const login = async (email, password) => {
    // Busca o usuário pelo email
    const [rows] = await connection.execute(
        'SELECT * FROM usuarios WHERE email = ?',
        [email]
    );

    if (rows.length === 0) {
        return false;
    }

    const isPasswordValid = await bcrypt.compare(password, rows[0].senha);
    if (!isPasswordValid) {
        return false;
    }

    return { email: rows[0].email };
};


module.exports = {
    login
};