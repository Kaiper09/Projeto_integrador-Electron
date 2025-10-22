const { buscarCliente, deleterCliente, inserirCliente } = require('./clienteDB');
const fs = require('fs');

test('buscarCliente deve retornar um array de clientes', async () => {
    const clientes= [
    { cpf: "012.345.678-99"},
  ];
  
    const retorno = await buscarCliente();

  expect(retorno[0].cpf).toBe("012.345.678-99")
});






