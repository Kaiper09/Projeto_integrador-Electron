const selectTag = document.getElementById("caixaDrop");
const tabelaCliente = document.getElementById('clientesTableDados');

const modalCpfCliente = document.getElementById('cliente-cpf');
const modalNomeCliente = document.getElementById('cliente-nome');
const modalNascimentoCliente = document.getElementById('cliente-nascimento');
const modalNumeroCliente= document.getElementById('cliente-numero');
const modalCidadeCliente= document.getElementById('cliente-cidade');
const modalSituacaoCliente= document.getElementById('cliente-situacao');

const dropDownSituacao= document.getElementById('situacao');

const botaoLimpar = document.getElementById('btn-limpar');
//const botaoExcluir = document.getElementById('btn-excluir');
const botaoSalvar = document.getElementById('btn-salvar');

botaoSalvar.addEventListener('click', salvarCliente);
//botaoExcluir.addEventListener('click', deleterCliente);
botaoLimpar.addEventListener('click', limpardados );




function mostrarDetalhes(cpf, nome, nascimento, numero, cidade,) {
    modalCpfCliente.value = cpf;
    modalNomeCliente.value = nome;

    if (nascimento instanceof Date && !isNaN(nascimento)) {
        modalNascimentoCliente.value = nascimento.toISOString().slice(0, 10);
        //Ela verifica se o valor nascimento é uma data válida. Se for, formata a data no ;
        // formato AAAA-MM-DD (padrão HTML). Se não for válida, limpa o campo.;

    } else {
        modalNascimentoCliente.value = '';
    }
    //modalNascimentoCliente.value = nascimento.toISOString().slice(0, 10);
    modalNumeroCliente.value= numero;
    modalCidadeCliente.value= cidade;
   
    
}

async function limpardados(){
     mostrarDetalhes(' ',' ',' ',' ', ' ',' ')
}

async function salvarCliente() {
    const newNome= modalNomeCliente.value;
    const newNascimento= modalNascimentoCliente.value;
    const newNumero= modalNumeroCliente.value;
    const newCidade= modalCidadeCliente.value;
   

    if(modalCpfCliente==''){
        if(newNome===''|| newNascimento==='' || newNumero==='' || newCidade===''){
            return;
        }console.log("testano insireiriraitgia");
        await window.bancoDeDadosAPI.inserirCliente(newNome, newNascimento, newCidade, newNumero);
        carregarClientes();
        console.log("fudeo muito testando");
        mostrarDetalhes(' ',' ',' ',' ', ' ', ' ');
        return;
    }else{
        console.log("alterando");
        await atualizarCliente();
        mostrarDetalhes(' ',' ',' ',' ', ' ', ' ');
    }

   
}

/*async function deleterCliente() {
    const cpf = modalCpfCliente.value;
    console.log("vou deletar o cpf ", cpf);

    const retorno = await window.bancoDeDadosAPI.deleterCliente(cpf);

    //após deleção atualiza a lista de Clientes
    carregarClientes();
     mostrarDetalhes(' ',' ',' ',' ', ' ',' ')
}*/

async function atualizarCliente() {
    const newNome= modalNomeCliente.value;
    const newNascimento= modalNascimentoCliente.value;
    const newNumero= modalNumeroCliente.value;
    const newCidade= modalCidadeCliente.value;
    const newSitucao= modalSituacaoCliente.value
    const newCpf= modalCpfCliente.value;

    console.log("atualização teste");
                                                    nome, nascimento, numero, cidade, situacao, cpf
    const retorno = await window.bancoDeDadosAPI.atualizarCliente(newNome, newNascimento, newNumero, newCidade, newCpf);
    carregarClientes();

}


async function carregarClientes() {
    const listaClientes = await window.bancoDeDadosAPI.buscarCliente();
    tabelaCliente.innerHTML = "";

    console.log(listaClientes)
    listaClientes.forEach(criarLinhaCliente);

    if (!listaClientes.length > 0) {

        tabelaCliente.textContent = "sem dados";
    }

    lucide.createIcons(); // renderiza os ícones do Lucide
}


function criarLinhaCliente(clientes) {
    //paragrafo.textContent = paragrafo.textContent + Cliente.nome

    //linha 
    const linha = document.createElement("tr");

    const celulaCpf= document.createElement("td");
    celulaCpf.textContent = clientes.cpf;
    linha.appendChild(celulaCpf);

    //nome
    const celulaNome = document.createElement("td");
    celulaNome.textContent = clientes.nome;
    linha.appendChild(celulaNome);

    //Nascimento
    const celulaNascimento = document.createElement("td");
    celulaNascimento.textContent = clientes.nascimento.toLocaleDateString();
    linha.appendChild(celulaNascimento);

    const celulaNumero=  document.createElement("td");
    celulaNumero.textContent= clientes.numero;
    linha.appendChild(celulaNumero);

    const celulaCidade= document.createElement("td");
    celulaCidade.textContent= clientes.cidade;
    linha.appendChild(celulaCidade);

    const celulaSituacao= document.createElement("td");
    celulaSituacao.textContent= clientes.situacao;
    linha.appendChild(celulaSituacao);

    //botao de modificar
    const celulaBotao = document.createElement("td");
    const botao = document.createElement("button");
    botao.addEventListener("click",
        function () { mostrarDetalhes(clientes.cpf, clientes.nome, clientes.nascimento, clientes.numero, clientes.cidade, clientes.situacao) }
    );
    botao.textContent = '';

    celulaBotao.appendChild(botao);


    linha.appendChild(celulaBotao);


    const icone = document.createElement("i")
    icone.setAttribute("data-lucide","edit");
    botao.appendChild(icone);

    const iconeLimpar = document.getElementById('ilimpar');
    iconeLimpar.setAttribute('data-lucide','circle-plus');

    const iconeSalvar = document.getElementById('isalvar');
    iconeSalvar.setAttribute('data-lucide','save');

    const iconelixo = document.getElementById('ilixo');
    iconelixo.setAttribute('data-lucide', 'trash-2');




    //final adiciono a linha criada com Nascimento,nome e botao à tabela
    tabelaCliente.appendChild(linha);

}

async function carregarTabela() {
    const opcao = ['Ativo', 'Inativo'];
    dropDownSituacao.innerHTML = "";

    opcao.forEach(situacao => {
        const option = document.createElement("option");
        option.value = situacao;
        option.textContent = situacao; 
        dropDownSituacao.appendChild(option);
    });
}


carregarTabela();
carregarClientes();