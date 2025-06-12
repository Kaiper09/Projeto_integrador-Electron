console.log("teste preload")

const { contextBridge, ipcRenderer } = require('electron')


function buscarCliente() {
    return ipcRenderer.invoke('buscar-cliente')
}

function atualizarCliente(nome, nascimento, numero, cidade, cpf) {
    return ipcRenderer.invoke('atualizar-cliente', nome, nascimento, numero, cidade, cpf)
}

function inserirCliente(cpf, nome, nascimento, numero, cidade) {
    return ipcRenderer.invoke('inserir-cliente', cpf, nome, nascimento, numero, cidade)
}

function deleterCliente(cpf) {
    return ipcRenderer.invoke('deletar-cliente', cpf)
}


//---------------------------------------

function abrirCliente(){
    ipcRenderer.send('abrir-cliente')
}

//-------------------------------

contextBridge.exposeInMainWorld('bancoDeDadosAPI',

    {
        buscarCliente: buscarCliente,
        atualizarCliente: atualizarCliente,
        inserirCliente: inserirCliente,
        deleterCliente: deleterCliente,
    })

contextBridge.exposeInMainWorld('janelaAPI',
{

    abrirCliente:abrirCliente,
})