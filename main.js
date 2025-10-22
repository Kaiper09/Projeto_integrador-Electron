const { app, BrowserWindow, Notification } = require('electron');
const path = require('path');
const {creatLoginWindow} = require('./src/janelaPrincipal');

const {createMainWindow} = require('./src/janelaPrincipal');

const{registrarListeners} = require('./src/APPListeners');

if (process.env.NODE_ENV !== 'production') {
  try {
    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
  } catch (error) {
    console.error('electron-reload não foi carregado:', error);
  }
}

 
      

function teste(titulo, mensagem){
    new Notification({
        title: "Alerta de atraso de serviço!",
        body: "Tal carro foi deixado na mecênica á 3 dias atrás e nem um serviço realizado!",
      }).show();
}
 
app.whenReady().then(function () {
 
  //createMainWindow();
  creatLoginWindow();
  //setInterval(teste, 3000) 
  registrarListeners();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });

}
);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
