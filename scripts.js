let mensagens = [];
let nome;
let MsgGeral = [];
//cadastro do nome no servidor

function cadastroNome (nomeEspecifico) {
    nome = {
        name: prompt('Qual o seu nome?')
    };

    //enviar nome para o servidor
    const promisse = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', nome);
    promisse.then(pegarDados);
    promisse.catch(deuRuim);

}
cadastroNome();

//Manter a Conexão

function conexao () {
    const promisse = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', nome)
    promisse.then();
    console.log(conexao)
}

setInterval(conexao, 5000);






//pegar mensagens do servidor
function pegarDados () {
    const promisse = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promisse.then(dadosMsg);
    
}

function dadosMsg(respostaGerais) {
    console.log(respostaGerais.data)
    mensagens = respostaGerais.data;
    console.log(mensagens);
    renderizarMensagens();
    FiltroMsgGeral();
}


function renderizarMensagens () {
    const elemento = document.querySelector('.chat-geral');

    elemento.innerHTML = '';

    for(let i = 0; i < mensagens.length; i++) {
        const type = mensagens[i].type;
        if (type === 'status') {
            let msgS = `
            <div class = "entrar-sair">
                <p>(${mensagens[i].time}) ${mensagens[i].from}: ${mensagens[i].text}</p>
            </div>
            `;
            elemento.innerHTML += msgS;
        }
        if (type === 'message') {
           let msgM = `
            <div class = "geral">
                <p>(${mensagens[i].time}) <span><strong>${mensagens[i].from}</strong>:</span> para ${mensagens[i].to} ${mensagens[i].text}</p>
            </div>
        `;
            elemento.innerHTML += msgM;
 
        }

        if (type === 'private_message') {
            let msgP = `
            <div class = "private">
                <p class = "private">(${mensagens[i].time}) <span><strong>${mensagens[i].from}</strong>:</span> para ${mensagens[i].to} ${mensagens[i].text}</p>
            </div>
        `;
            elemento.innerHTML += msgP;
        }
    }

    elemento.scrollIntoView({block: "end"});
}


pegarDados();

setInterval (pegarDados, 3000);


 
function mandarMsg() {

    const elementoMsg = document.querySelector('input')
    //colocando no formarto que a msg quer

    const Msg = {

        from: nome.name,
        to: "Todos",
        text: elementoMsg.value,
        type: "message"
};

    const promisse = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', Msg)
    promisse.then(pegarDados);
   

    renderizarMensagens();

    console.log(Msg);
}




function deuRuim (erro) {
    console.log(erro);
    alert('Já possui um usuário com este nome, digite um nome válido.');
}

function Geral(MsgGeral) {
    if (MsgGeral.type === "status") {
        return true;
    }else {
        return false;
    }
}

function FiltroMsgGeral () {
    const listaGeral = mensagens.filter(Geral);
    console.log(lista);
    
}


