

const { contextBridge, ipcRenderer } = require('electron')


function buscarCliente() {
    return ipcRenderer.invoke('buscar-cliente')
}

function atualizarCliente(nome, nascimento, numero, cidade, situacao , cpf) {
    return ipcRenderer.invoke('atualizar-cliente', nome, nascimento, numero, cidade, situacao,cpf)
    //                                       
}

function inserirCliente(cpf, nome, nascimento, numero, cidade) {
    return ipcRenderer.invoke('inserir-cliente', cpf, nome, nascimento, numero, cidade,situacao )
}

function deleterCliente(cpf) {
    return ipcRenderer.invoke('deletar-cliente', cpf)
}


//---------------------------------------

function abrirCliente(){
    ipcRenderer.send('abrir-cliente')
}

//-------------------------------

function validarLogin(usuario, senha){
    return ipcRenderer.invoke('validar-login', usuario, senha)
}


//-------------------------------

contextBridge.exposeInMainWorld('bancoDeDadosAPI',

    {
        buscarCliente: buscarCliente,
        atualizarCliente: atualizarCliente,
        inserirCliente: inserirCliente,
        deleterCliente: deleterCliente,

        //-------------------------------
        
        validarLogin: validarLogin,

    })

function abrirMenuPrincipal(){
    ipcRenderer.send('abrir-menu')
}

contextBridge.exposeInMainWorld('janelaAPI',
{
    abrirMenuPrincipal,
    abrirCliente:abrirCliente,
})