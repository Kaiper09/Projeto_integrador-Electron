const {BrowserWindow} = require('electron')
const path = require('path')

let janelaPrincipal;

function createMainWindow() {
  janelaPrincipal = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  janelaPrincipal.loadFile('./src/index.html');
  
  janelaPrincipal.on('closed', () =>{
    janelaPrincipal = null; //limpa a referencia quando a jenela é fechada
  })

  return janelaPrincipal;
}

function getJanelaPrincipal(){
    return janelaPrincipal
}

module.exports={
    getJanelaPrincipal,
    createMainWindow
}
