const db = require('../db')

async function validarLogin(event, email, senha){
    const resultado= await db.query('SELECT * FROM servicos.usuarios WHERE email=$1 and senha=$2',[email, senha])

    if(resultado.rows.length > 0){
        return resultado.rows[0]
    }
    return false
}

module.exports = {
    validarLogin,
    
}
