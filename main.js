const form = document.getElementById('form-atividade');
const imgAprovado = '<img src="./images/aprovado.png" alt="emoji celebrando" />'
const imgReprovado = '<img src="./images/reprovado.png" alt="emoji decepcionado" />'
const atividades = []; /*array para atividades do usuário*/
const notas = []; /*array para notas do usuário*/
const spanAprovado = '<span class="resultado aprovado">Aprovado</span>';
const spanReprovado = '<span class="resultado reprovado">Reprovado</span>';
const notaMinima = parseFloat(prompt("Digite a média:"));

let linhas = '';

form.addEventListener('submit', function(e) {
    e.preventDefault(); /*remove o comportamento do formulario onde quando sbmetido atualiza a tela*/

    adicionaLinha();
    atualizaTabela();
    atualizaMediaFinal();
});

function adicionaLinha() {
    const inputNomeAtividade = document.getElementById('nome-atividade');
    const inputNotaAtividade = document.getElementById('nota-atividade');

    if(atividades.includes(inputNomeAtividade.value)) {
        alert(`A atividade: ${inputNomeAtividade.value} já foi inserida`);
    } else {
        atividades.push(inputNomeAtividade.value);
        notas.push(parseFloat(inputNotaAtividade.value)); /*alterar o input de string para numero, parseFloat pois pode ser numero quebrado*/

        let linha = '<tr>'; /*abre a tag - recebe o código html como uma string*/
        linha += `<td>${inputNomeAtividade.value}</td>`; /*coluna*/
        linha += `<td>${inputNotaAtividade.value}</td>`;
        linha += `<td>${inputNotaAtividade.value >= notaMinima ? imgAprovado : imgReprovado}</td>`; /* vamos utilizar o operador ternario ?(if) - aprovado, :(else) - reprovado*/
        linha += '</tr>';

        linhas += linha; /* linhas recebe linha*/
    }

    inputNomeAtividade.value = ''; /*limpar os campos após add o conteúdo*/
    inputNotaAtividade.value = '';
}

function atualizaTabela() {
    const corpoTabela = document.querySelector('tbody');
    corpoTabela.innerHTML = linhas;
}

function atualizaMediaFinal() {
    const mediaFinal = calculaMediaFinal();

    document.getElementById('media-final-valor').innerHTML = mediaFinal.toFixed(2);
    document.getElementById('media-final-resultado').innerHTML = mediaFinal >= notaMinima? spanAprovado : spanReprovado;

}

function calculaMediaFinal() {
    let somaDasNotas = 0;

    for (let i = 0; i < notas.length; i++) { /* notas.length quantidades de notas que o usuário inseriu, i++ é incrementado cada vez que entra no for*/
        somaDasNotas += notas[i];
    }    

    return somaDasNotas / notas.length;
}