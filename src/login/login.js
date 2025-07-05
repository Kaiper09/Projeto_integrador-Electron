const login = document.getElementById('login');
const senha = document.getElementById('senha');
const btn_acessar = document.getElementById('acessar');
const msg= document.getElementById('msg')

btn_acessar.addEventListener('click', validarLogin)


async function validarLogin(){
    const retorno= await window.bancoDeDadosAPI.validarLogin(login.value.toLowerCase(), senha.value)
    console.log(retorno)

    localStorage.setItem('perfil', retorno.perfil);
    localStorage.setItem('cpf_cliente', retorno.cpf_cliente)

   const perfil = localStorage.getItem('perfil');
   const cpfCliente = localStorage.getItem('cpf_cliente');

   console.log(perfil)
   console.log(cpfCliente)

    if(retorno.perfil==='adm'){
        console.log("adm")
    await window.janelaAPI.abrirMenuPrincipal()

    }else{
    await window.janelaAPI.abrirUser()
    console.log('user')
}
}


