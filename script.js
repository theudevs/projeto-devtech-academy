
const alunos = [];

let indiceEdicao = null;


function salvarAluno(evento){
    evento.preventDefault();

    const inputNome = document.getElementById('nome');
    const inputIdade = document.getElementById('idade');
    const selectCurso = document.getElementById('curso');
    const inputNota = document.getElementById('nota');
    const mensagem = document.getElementById('mensagem');

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

    const aluno = {
        nome: inputNome.value,
        idade: Number(inputIdade.value),
        curso: selectCurso.value,
        nota: Number(inputNota.value)
    };

    if (indiceEdicao === null) {
        alunos.push(aluno);
        mensagem.style.color = 'green';
        mensagem.textContent = 'Aluno cadastrado com sucesso!';
    } else {
        alunos[indiceEdicao] = aluno; 
        indiceEdicao = null;
        mensagem.style.color = 'green';
        mensagem.textContent = 'Edição salva com sucesso!';
    }   

    renderTabela();

    document.querySelector('form').reset();
};

function renderTabela() {
  const tbody = document.getElementById('tbody-alunos');
  tbody.innerHTML = '';

  for (let i = 0; i < alunos.length; i++) {
        const aluno = alunos[i];
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${aluno.nome}</td>
            <td>${aluno.idade}</td>
            <td>${aluno.curso}</td>
            <td>${aluno.nota}</td>
            <td>
                <button type="button" onclick="editarAluno(${i})">Editar</button>
                <button type="button" onclick="excluirAluno(${i})">Excluir</button>
            </td>
        `;
        tbody.appendChild(tr);
    }
}

function excluirAluno(index){
    alunos.splice(index,1);
    renderTabela();
}

function editarAluno(index) {
    const aluno = alunos[index];
    document.getElementById('nome').value = aluno.nome;
    document.getElementById('idade').value = aluno.idade;
    document.getElementById('curso').value = aluno.curso;
    document.getElementById('nota').value = aluno.nota;
    
    indiceEdicao = index;
}


