console.log('app carregado');

class Aluno {
    constructor(nome, idade, curso, notaFinal) {
        this.nome = nome;
        this.idade = idade;
        this.curso = curso;
        this.notaFinal = notaFinal;
    }

    isAprovado() {
        return this.notaFinal >= 7;
    }

    toString() {
        const status = this.isAprovado() ? 'Aprovado' : 'Reprovado';
        return `${this.nome} - ${this.idade} - ${this.curso} - Nota: ${this.notaFinal} - (${status})`;
    }
}

const alunos = [];

let indiceEdicao = null;

const mensagem = document.getElementById('mensagem');

const form = document.getElementById('form-aluno');
const inputNome = document.getElementById('nome');
const inputIdade = document.getElementById('idade');
const selectCurso = document.getElementById('curso');
const inputNota = document.getElementById('nota');
const tbody = document.getElementById('tbody-alunos');
const btnSalvar = document.getElementById('btn-salvar');


form.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const nome = inputNome.value;
    const idade = inputIdade.value;
    const curso = selectCurso.value;
    const nota = inputNota.value;

    if (nome.trim() === '') {
        mensagem.textContent = 'Por favor, preencha o nome.';
        return;
    }

    const idadeNum = Number(idade);
    if (Number.isNaN(idadeNum) || idadeNum < 1) {
        mensagem.style.color = 'red';
        mensagem.textContent = 'A idade deve ser um número maior que 0.';
        return;
    }

    const notaNum = Number(nota);
    if (Number.isNaN(notaNum) || notaNum < 0 || notaNum > 10) {
        mensagem.style.color = 'red';
        mensagem.textContent = 'A nota deve estar entre 0 e 10.';
        return;
    }

    const aluno = new Aluno(nome, Number(idade), curso, Number(nota));
    console.log(aluno.toString());

    if (indiceEdicao === null) {
        alunos.push(aluno);
        mensagem.style.color = 'green';
        mensagem.textContent = 'Aluno cadastrado com sucesso!';
        console.log(`Aluno cadastrado`);
    } else {
        alunos[indiceEdicao] = aluno;
        indiceEdicao = null;
        btnSalvar.textContent = 'Cadastrar';
        mensagem.style.color = 'green';
        mensagem.textContent = 'Edição salva com sucesso!';
        console.log(`Aluno editado`);
    }

    renderTabela();

    console.log(alunos);

    form.reset();
});

function renderTabela() {
    const tbody = document.getElementById('tbody-alunos');
    tbody.innerHTML = '';

    alunos.forEach((aluno, index) => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
      <td>${aluno.nome}</td>
      <td>${aluno.idade}</td>
      <td>${aluno.curso}</td>
      <td>${aluno.notaFinal}</td>
      <td>${aluno.isAprovado() ? 'Aprovado' : 'Reprovado'}</td>
      <td>
        <button type="button" class="btn-editar" data-index="${index}">Editar</button>
        <button type="button" class="btn-excluir" data-index="${index}">Excluir</button>
      </td>
    `;

        tbody.appendChild(tr);
    });
}

tbody.addEventListener('click', (evento) => {
    const botao = evento.target;

    if (botao.classList.contains('btn-excluir')) {
        const indice = botao.dataset.index;
        const nomeAlunoExcluido = alunos[indice].nome;
        alunos.splice(indice, 1);
        renderTabela();

        console.log(`Aluno "${nomeAlunoExcluido}" excluído`);
    }

    if (botao.classList.contains('btn-editar')) {
        const indice = Number(botao.dataset.index);
        const aluno = alunos[indice];

        inputNome.value = aluno.nome;
        inputIdade.value = aluno.idade;
        selectCurso.value = aluno.curso;
        inputNota.value = aluno.notaFinal;

        btnSalvar.textContent = 'Salvar edição';
        indiceEdicao = indice;
        mensagem.style.color = 'blue';
        mensagem.textContent = 'Editando aluno...';
    }
});

