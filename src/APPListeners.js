const {ipcMain}=require('electron')
const {createMainWindow} = require('./janelaPrincipal');
const {createUserWindow} = require('./janelaPrincipal')

const {
    buscarCliente,
    atualizarCliente,
    inserirCliente,
    deleterCliente,
}=require('./cliente/clienteDB')

const { modalAbrirCliente } = require('./janelaModal')

//-----------------------------------

const {
    validarLogin,
    
}= require('./login/loginDB')

//----------------------------------
function registrarClienteHandler(){
    ipcMain.handle('buscar-cliente',buscarCliente)
    ipcMain.handle('inserir-cliente',inserirCliente)
    ipcMain.handle('atualizar-cliente',atualizarCliente)
    ipcMain.handle('deletar-cliente',deleterCliente)
}

//-----------------------------------
    function registrarLoginHandler(){
        ipcMain.handle('validar-login', validarLogin)
      
    }
//-----------------------------------


function registrarJanela(){
    ipcMain.on('abrir-cliente',modalAbrirCliente)
    ipcMain.on('abrir-user', createUserWindow)
    ipcMain.on('abrir-menu',createMainWindow)
    
}

//--------------------------------

function registrarListeners(){
    registrarClienteHandler();
    registrarLoginHandler();
    registrarJanela();
}

module.exports={
    registrarListeners
}