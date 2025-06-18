const login = document.getElementById('login');
const senha = document.getElementById('senha');
const btn_acessar = document.getElementById('acessar');
const msg= document.getElementById('msg')

btn_acessar.addEventListener('click', validarlogin)

async function validarlogin(){

    const retorno= await window.bancoDeDadosAPI.validarLogin(login.value, senha.value)
    if(retorno){
        await window.janelaAPI.abrirMenuPrincipal()
        msg.textContent="Acessado com sucesso"
        msg.style.color="green"

    }else{
    msg.style.color="red";
    msg.textContent = "Senha ou Email incorreto";
}
    
}