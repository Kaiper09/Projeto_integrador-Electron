const tabelaCliente = document.getElementById('clientesTableDados');

const modalCpfCliente = document.getElementById('cliente-cpf');
const modalNomeCliente = document.getElementById('cliente-nome');
const modalNascimentoCliente = document.getElementById('cliente-nascimento');
const modalNumeroCliente= document.getElementById('cliente-numero')
const modalCidadeCliente= document.getElementById('cliente-cidade')


const botaoLimpar = document.getElementById('btn-limpar');
const botaoExcluir = document.getElementById('btn-excluir');
const botaoSalvar = document.getElementById('btn-salvar');

botaoSalvar.addEventListener('click', salvarCliente)
botaoExcluir.addEventListener('click', deleterCliente)
botaoLimpar.addEventListener('click', limpardados )




function mostrarDetalhes(cpf, nome, nascimento, numero, cidade) {
    console.log(nascimento)
    modalCpfCliente.value = cpf;
    modalNomeCliente.value = nome;
    modalNascimentoCliente.value = nascimento.toISOString().slice(0, 10);
    modalNumeroCliente.value= numero;
    modalCidadeCliente.value= cidade;
    
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


async function deleterCliente() {
    const cpf = modalCpfCliente.value;
    console.log("vou deletar o cpf ", cpf);

    const retorno = await window.bancoDeDadosAPI.deleterCliente(cpf);

    //após deleção atualiza a lista de Clientes
    carregarClientes();
    mostrarDetalhes("", "", "", "", "");
}

async function atualizarCliente() {
    const pcpf = modalCpfCliente.value;
    const novoNome = modalNomeCliente.value;
    const novaNascimento = modalNascimentoCliente.value;
    console.log("atualização teste")
    const retorno = await window.bancoDeDadosAPI.atualizarCliente(novoNome, novaNascimento, pcpf)
    carregarClientes()
}


async function carregarClientes() {
    const listaClientes = await window.bancoDeDadosAPI.buscarCliente();
    tabelaCliente.innerHTML = "";

    console.log(listaClientes)
    listaClientes.forEach(criarLinhaCliente)

    if (!listaClientes.length > 0) {

        tabelaCliente.textContent = "sem dados"
    }

    lucide.createIcons(); // renderiza os ícones do Luccpfe
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
    celulaNascimento.textContent = clientes.nascimento.toLocaleDateString()
    linha.appendChild(celulaNascimento);

    const celulaNumero=  document.createElement("td");
    celulaNumero.textContent= clientes.numero;
    linha.appendChild(celulaNumero);

    const celulaCidade= document.createElement("td");
    celulaCidade.textContent= clientes.cidade;
    linha.appendChild(celulaCidade)

    //botao de modificar
    const celulaBotao = document.createElement("td");
    const botao = document.createElement("button");
    botao.addEventListener("click",
        function () { mostrarDetalhes(clientes.cpf, clientes.nome, clientes.nascimento, clientes.numero, clientes.cidade) }
    );
    botao.textContent = '';

    celulaBotao.appendChild(botao);


    linha.appendChild(celulaBotao);


    const icone = document.createElement("i")
    icone.setAttribute("data-lucide","edit");
    botao.appendChild(icone);

    const iconeLimpar = document.getElementById('ilimpar')
    iconeLimpar.setAttribute('data-lucide','circle-plus')

    const iconeSalvar = document.getElementById('isalvar')
    iconeSalvar.setAttribute('data-lucide','save')

    const iconelixo = document.getElementById('ilixo')
    iconelixo.setAttribute('data-lucide', 'trash-2')




    //final adiciono a linha criada com Nascimento,nome e botao à tabela
    tabelaCliente.appendChild(linha);

}
carregarClientes()