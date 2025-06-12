const {ipcMain}=require('electron')

const {
    buscarCliente,
    atualizarCliente,
    inserirCliente,
    deleterCliente,
}=require('./cliente/clienteDB')
const { modalAbrirCliente } = require('./janelaModal')

//-----------------------------------

//----------------------------------
function registrarClienteHandler(){
    ipcMain.handle('buscar-cliente',buscarCliente)
    ipcMain.handle('inserir-cliente',inserirCliente)
    ipcMain.handle('aualizar-cliente',atualizarCliente)
    ipcMain.handle('deletar-cliente',deleterCliente)
}

//-----------------------------------

function registrarJanela(){
    ipcMain.on('abrir-cliente',modalAbrirCliente)
}

//--------------------------------

function registrarListeners(){
    registrarClienteHandler();
    registrarJanela();
}

module.exports={
    registrarListeners
}
