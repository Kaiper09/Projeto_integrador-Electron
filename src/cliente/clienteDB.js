const db = require('../db')

async function buscarCliente(){
    const resultado= await db.query('SELECT * FROM SERVICOS.CLIENTES')
    return resultado.rows

}
async function inserirCliente(event,cpf, nome, nascimento, numero, cidade, situacao) {
    //console.log(event)
    console.log("vou inserir")
    const resultado = await db.query ('INSERT INTO SERVICOS.CLIENTES (cpf, nome, nascimento, numero, cidade, situacao) VALUES ($1, $2, $3, $4, $5, $6)',[cpf, nome, nascimento, numero, cidade, situacao])
    return resultado.rows
}

async function atualizarCliente(event, nome, nascimento, numero, cidade, situacao, cpf ) {
    //console.log(event)
    console.log(cpf)
    console.log("Vou atualizar o cliente")
    const resultado = await db.query ('UPDATE servicos.clientes SET nome=$1, nascimento=$2, numero=$3, cidade=$4, situacao=$5 WHERE cpf=$6',[nome,nascimento,numero,cidade, situacao,cpf])
    return resultado.rows
}

async function deleterCliente(event,cpf) {
    //console.log(event)
    console.log("vou deletar")
    const resultado = await db.query('DELETE FROM servicos.clientes WHERE cpf= $1',[cpf])
    return resultado.rows

}

module.exports={
    buscarCliente,
    inserirCliente,
    atualizarCliente,
    deleterCliente,
}