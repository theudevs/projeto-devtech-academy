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

const btnAprovados = document.getElementById('btn-aprovados');
const btnMediaNotas = document.getElementById('btn-media-notas');
const btnMediaIdades = document.getElementById('btn-media-idades');
const btnOrdemAlf = document.getElementById('btn-alfabetico');
const btnPorCurso = document.getElementById('btn-por-curso');
const Relatorio = document.getElementById('saida-relatorio');
const TipoRelatorio = document.getElementById('tipo-relatorio');

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

btnAprovados.addEventListener('click', () => {
    Relatorio.innerHTML = '';
    TipoRelatorio.textContent = 'Alunos aprovados';
    if(!alunos.length){
        Relatorio.textContent = 'Não há alunos cadastrados';
        return;
    }
    const aprovados = alunos.filter(a => a.isAprovado());
    Relatorio.textContent = aprovados.length 
    ? aprovados.map(a => a.toString()).join('\n') 
    : 'Nenhum aluno aprovado.';
});

btnMediaNotas.addEventListener('click', () => {
    Relatorio.innerHTML = '';
    TipoRelatorio.textContent = 'Média das notas';
    if(!alunos.length){
        Relatorio.textContent = 'Não há alunos cadastrados';
        return;
    }
    const soma = alunos.reduce((acumulador, a) => acumulador + a.notaFinal,0);
    const media = soma / alunos.length;
    Relatorio.textContent = `${media.toFixed(2)}`;
});

btnMediaIdades.addEventListener('click', () => {
    Relatorio.innerHTML = '';
    TipoRelatorio.textContent = 'Média das idades';
    if(!alunos.length){
        Relatorio.textContent = 'Não há alunos cadastrados';
        return;
    }
    const soma = alunos.reduce((acumulador, a) => acumulador + a.idade,0);
    const media = soma / alunos.length;
    Relatorio.textContent = `${media.toFixed(2)}`;
});

btnOrdemAlf.addEventListener('click', () => {
    Relatorio.innerHTML = '';
    TipoRelatorio.textContent = 'Lista de nomes em ordem alfabética';
    if(!alunos.length){
        Relatorio.textContent = 'Não há alunos cadastrados';
        return;
    }
    const nomes = alunos.map(a => a.nome).sort((a, b) => a.localeCompare(b));
    Relatorio.textContent = nomes.join('\n');
});

btnPorCurso.addEventListener('click', () => {
    Relatorio.innerHTML = '';
    TipoRelatorio.textContent = 'Quantidade de alunos por curso';
    if(!alunos.length){
        Relatorio.textContent = 'Não há alunos cadastrados';
        return; 
    }
    const contagem = alunos.reduce((acumulador, a) => {
        acumulador[a.curso] = (acumulador[a.curso] || 0) + 1;
        return acumulador;
    }, {});

    const linhas = Object.entries(contagem)
        .map(([curso, qtd]) => `${curso}: ${qtd}`)
        .join('\n');
    Relatorio.textContent = `${linhas}`;
});