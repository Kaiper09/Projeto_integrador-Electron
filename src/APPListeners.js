const {ipcMain}=require('electron')
const {createMainWindow} = require('./janelaPrincipal');
const {createUserWindow} = require('./janelaPrincipal')

const {
    buscarCliente,
    atualizarCliente,
    inserirCliente,
    deleterCliente,
    verificarCPF,
    clienteNotificar,
}=require('./cliente/clienteDB')

const { modalAbrirCliente } = require('./janelaModal')

//-----------------------------------

const {
    validarLogin,
}= require('./login/loginDB');

const {telaUsuario}= require('./user/userDB')
//----------------------------------
function registrarClienteHandler(){
    ipcMain.handle('buscar-cliente',buscarCliente)
    ipcMain.handle('inserir-cliente',inserirCliente)
    ipcMain.handle('atualizar-cliente',atualizarCliente)
    ipcMain.handle('deletar-cliente',deleterCliente)
    ipcMain.handle('verificar-cpf', verificarCPF)
    ipcMain.handle('notificarCliente', clienteNotificar)

}

//-----------------------------------
    function registrarLoginHandler(){
        ipcMain.handle('validar-login', validarLogin)
      
    }
//-----------------------------------

    function registrarUserHandler(){
        ipcMain.handle('usuarios', telaUsuario)
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
    registrarUserHandler()
    registrarJanela();
    registrarNotificao();   
}

module.exports={
    registrarListeners
}