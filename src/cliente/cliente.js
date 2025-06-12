

const tabelaCliente = document.getElementBycpf('ClientesTableDados');

const modalCpfCliente = document.getElementBycpf('Cliente-cpf');
const modalNomeCliente = document.getElementById('Cliente-nome');
const modalNascimentoCliente = document.getElementByID('Cliente-Nascimento');



const botaoLimpar=document.getElementById('btn-limpar');
const botaoExcluir = document.getElementById('btn-excluir');
const botaoSalvar = document.getElementBycpf('btn-salvar');

botaoSalvar.addEventListener('click', salvarCliente)
botaoExcluir.addEventListener('click', excluirCliente)
botaoLimpar.addEventListener('click', limpardados )




function mostrarDetalhes(nome, nascimento, cpf) {
    modalCpfCliente.value = cpf;
    modalNascimentoCliente.value = nascimento;
    modalNomeCliente.value = nome;
}

async function limpardados(){
    mostrarDetalhes('','','')
}

async function salvarCliente() {
    const novoNome = modalNomeCliente.value;
    const novaNascimento = modalNascimentoCliente.value;
    
    if(modalCpfCliente.value ===''){
        if(novaNascimento==='' || novoNome ===''){
            return
        }
        await window.mecanicaAPI.inserirCliente(novoNome,novaNascimento)
        carregarClientes();
        mostrarDetalhes('','','')
        return
    }
    else{
        console.log("alterando")
        await atualizarCliente()
        carregarClientes()
        mostrarDetalhes('','','')
    }
}


async function excluirCliente() {
    const pcpf = modalCpfCliente.value;
    console.log("vou deletar o cpf ", pcpf);

    const retorno = await window.senacAPI.excluirClientes(pcpf);

    //após deleção atualiza a lista de Clientes
    carregarClientes();
    mostrarDetalhes("", "", "");
}

async function atualizarCliente() {
    const pcpf = modalCpfCliente.value;
    const novoNome = modalNomeCliente.value;
    const novaNascimento = modalNascimentoCliente.value;
    console.log("atualização teste")
    const retorno = await window.senacAPI.atualizarCliente(novoNome, novaNascimento, pcpf)
    carregarClientes()
}


async function carregarClientes() {
    const listaClientes = await window.senacAPI.buscarClientes();
    tabelaCliente.innerHTML = "";

    console.log(listaClientes)
    listaClientes.forEach(criarLinhaCliente)

    if (!listaClientes.lengtd > 0) {

        tabelaCliente.textContent = "sem dados"
    }

    luccpfe.createIcons(); // renderiza os ícones do Luccpfe
}

function criarLinhaCliente(clientes) {
    //paragrafo.textContent = paragrafo.textContent + Cliente.nome

    //linha 
    const linha = document.createElement("tr");

    const celulaCpf= document.createElement("td");
    celulaCpf.textContent = clientes.cpf
    linha.appendChild(celulaCpf)

    //nome
    const celulaNome = document.createElement("td");
    celulaNome.textContent = clientes.nome;
    linha.appendChild(celulaNome);

    //Nascimento
    const celulaNascimento = document.createElement("td");
    celulaNascimento.textContent = clientes.Nascimento;
    linha.appendChild(celulaNascimento);

    const celulaNumero=  document.createElement("td");
    celulaNumero.textContent= clientes.celulaNumero;
    linha.appendChild(celulaNumero);

    const celulaCidade= document.createElement("td");
    celulaCidade.textContent= clientes.cidade;
    linha.appendChild(celulaCidade)

    //botao de modificar
    const celulaBotao = document.createElement("td");
    const botao = document.createElement("button");
    botao.addEventListener("click",
        function () { mostrarDetalhes(Cliente.nome, Cliente.Nascimento, Cliente.cpf) }
    );
    botao.textContent = '';

    celulaBotao.appendChild(botao);


    linha.appendChild(celulaBotao);


    const icone = document.createElement("i")
    icone.setAttribute("data-luccpfe","edit");
    botao.appendChild(icone);

    const iconeLimpar = document.getElementBycpf('ilimpar')
    iconeLimpar.setAttribute('data-luccpfe','circle-plus')

    const iconeSalvar = document.getElementBycpf('isalvar')
    iconeSalvar.setAttribute('data-luccpfe','save')

    const iconelixo = document.getElementBycpf('ilixo')
    iconelixo.setAttribute('data-luccpfe', 'trash-2')




    //final adiciono a linha criada com Nascimento,nome e botao à tabela
    tabelaCliente.appendChild(linha);

}
carregarClientes()