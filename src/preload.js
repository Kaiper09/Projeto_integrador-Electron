

const { contextBridge, ipcRenderer } = require('electron')


function buscarCliente() {
    return ipcRenderer.invoke('buscar-cliente')
}

function atualizarCliente(nome, nascimento, numero, cidade, situacao , cpf) {
    return ipcRenderer.invoke('atualizar-cliente', nome, nascimento, numero, cidade, situacao, cpf)
    //                                       
}

function inserirCliente(cpf, nome, nascimento, numero, cidade, situacao) {
    return ipcRenderer.invoke('inserir-cliente', cpf, nome, nascimento, numero, cidade, situacao )
}                                                   

function deleterCliente(cpf) {
    return ipcRenderer.invoke('deletar-cliente', cpf)
}

function verificarCPF(cpf){
    return ipcRenderer.invoke('verificar-cpf', cpf)
}

function notificarCliente(){
    return ipcRenderer.invoke('notificarCliente')
}

//---------------------------------------

function abrirUser(){
    ipcRenderer.send('abrir-user')
}

function abrirCliente(){
    ipcRenderer.send('abrir-cliente')
}
 
//-------------------------------

function validarLogin(usuario, senha){
    return ipcRenderer.invoke('validar-login', usuario, senha)
}

function telaUsuario(cpf_cliente){
    return ipcRenderer.invoke('usuarios', cpf_cliente)
}

//-------------------------------

contextBridge.exposeInMainWorld('bancoDeDadosAPI',

    {
        buscarCliente,
        atualizarCliente,
        inserirCliente,
        deleterCliente,
        verificarCPF,
        notificarCliente,

        //-------------------------------
        
        validarLogin,
        telaUsuario,
        
       

    })

function abrirMenuPrincipal(){
    ipcRenderer.send('abrir-menu')
    
}

function abrirUser(){
    ipcRenderer.send('abrir-user')
}

contextBridge.exposeInMainWorld('janelaAPI',
{
    abrirMenuPrincipal,
    abrirUser,
    abrirCliente,
})