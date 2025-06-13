const db = require('../db')

async function buscarCliente(){
    const resultado= await db.query('SELECT * FROM SERVICOS.CLIENTES')
    return resultado.rows

}
async function inserirCliente(event,cpf, nome, nascimento, numero, cidade) {
    console.log(event)
    const resultado = await db.query ('INSERT INTO SERVICOS.CLIENTES (cpf, nome, nascimento, numero, cidade) VALUES ($1, $2, $3, $4, $5)',[cpf, nome, nascimento, numero, cidade])
    return resultado.rows
}

async function atualizarCliente(event, nome, nascimento, numero, cidade, cpf ) {
    console.log(event)
    const resultado = await db.query ('UPDATE servicos.clientes SET nome=$1, nascimento=$2, numero=$3, cidade=$4 WHERE cpf=$5',[nome,nascimento,numero,cidade,cpf])
    return resultado.rows
}

async function deleterCliente(event,cpf) {
    console.log(event)
    const resultado = await db.query('DELETE FROM servicos.clientes WHERE cpf= $1',[cpf])
    return resultado.rows

}

module.exports={
    buscarCliente,
    inserirCliente,
    atualizarCliente,
    deleterCliente,
}