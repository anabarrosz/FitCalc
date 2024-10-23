// Função para arredondar conforme a regra especificada
function arredondar(valor) {
    const decimal = valor - Math.floor(valor);
    return decimal >= 0.60 ? Math.ceil(valor) : Math.floor(valor);
}

// Função para calcular a quantidade diária de calorias
function calcularCaloria() {
    const peso = parseFloat(document.getElementById("peso").value);
    const idade = parseInt(document.getElementById("idade").value);
    const altura = parseFloat(document.getElementById("altura").value);
    const sexo = document.getElementById("sexo").value;
    const objetivo = document.getElementById("objetivo").value;
    const atividade = document.querySelector('input[name="atividade"]:checked');

    if (isNaN(peso) || isNaN(idade) || isNaN(altura) || !sexo || !objetivo || !atividade) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }

    // Cálculo de calorias baseado em fatores como sexo, idade, altura e nível de atividade
    let caloriasBasal = (sexo === 'masculino') 
                        ? 88.36 + (13.4 * peso) + (4.8 * altura) - (5.7 * idade) 
                        : 447.6 + (9.2 * peso) + (3.1 * altura) - (4.3 * idade);

    // Ajustar calorias com base no objetivo
    switch (objetivo) {
        case 'ganho_massa':
            caloriasBasal *= 1.2;
            break;
        case 'emagrecimento':
            caloriasBasal *= 0.8;
            break;
        case 'manutencao':
            caloriasBasal *= 1.0;
            break;
    }

    // Ajustar calorias com base no nível de atividade
    const atividadeFisica = atividade.value;
    if (atividadeFisica === 'ativo') {
        caloriasBasal *= 1.2;
    } else if (atividadeFisica === 'sedentario') {
        caloriasBasal *= 1.0;
    }

    // Mostrar o resultado de calorias
    document.getElementById("caloria-resultado").textContent = arredondar(caloriasBasal).toFixed(0) + " kcal";

    // Exibir o resultado
    document.getElementById("resultado-container").style.display = "block";
    document.getElementById("form-container").style.display = "none";
}

// Função para mostrar ou esconder as opções de atividade física
function toggleAtividadeFisica(exibir) {
    const atividadeOpcoes = document.getElementById("atividade-opcoes");
    atividadeOpcoes.style.display = exibir ? "block" : "none";
}

// Função para selecionar a atividade e ajustar a cor dos itens
function selecionarAtividade(pos) {
    const itens = document.querySelectorAll('.progress-item');
    itens.forEach((item, index) => {
        item.style.backgroundColor = index === pos - 1 ? '#3da9a9' : '#00425c'; // Mudar a cor do item selecionado
    });
}

// Função para detectar o arrasto do slider e travar em três pontos específicos
const slider = document.getElementById('slider');
const progressLevel = document.getElementById('progress-level');
const items = document.querySelectorAll('.progress-item');

// Define as posições das três opções (em porcentagem)
const positions = [0, 50, 100]; // 0% para 'Pouco ativo', 50% para 'Ativo', 100% para 'Muito ativo'
let currentPosition = 0; // Inicia na posição 'Pouco ativo'

// Função para selecionar a atividade e mover a bolinha para a posição correta
function selecionarAtividade(pos) {
    currentPosition = pos - 1;
    moveSlider(currentPosition);
}

// Função para mover o slider e ajustar a barra de progresso
function moveSlider(positionIndex) {
    const leftPercent = positions[positionIndex] + '%';
    slider.style.left = `calc(${leftPercent} - 7.5px)`;
    progressLevel.style.width = leftPercent;

    // Adiciona a classe 'active' ao item selecionado e remove dos outros
    items.forEach((item, index) => {
        item.classList.toggle('active', index === positionIndex);
    });
}

// Função para detectar o arrasto do slider e travar em três pontos específicos
slider.addEventListener('mousedown', function () {
    document.onmousemove = function (event) {
        const sliderRect = slider.parentElement.getBoundingClientRect();
        let newLeft = event.clientX - sliderRect.left;
        let sliderWidth = sliderRect.width;

        // Restringir o movimento dentro da barra
        if (newLeft < 0) newLeft = 0;
        if (newLeft > sliderWidth) newLeft = sliderWidth;

        // Calcular a porcentagem com base na posição do mouse
        const percent = (newLeft / sliderWidth) * 100;

        // Encontrar a posição mais próxima (0%, 50% ou 100%)
        if (percent < 25) {
            currentPosition = 0; // 'Pouco ativo'
        } else if (percent < 75) {
            currentPosition = 1; // 'Ativo'
        } else {
            currentPosition = 2; // 'Muito ativo'
        }

        // Mover a bolinha temporariamente enquanto arrasta
        const leftPercent = positions[currentPosition] + '%';
        slider.style.left = `calc(${leftPercent} - 7.5px)`;
        progressLevel.style.width = leftPercent;
    };

    document.onmouseup = function () {
        // Travar a bolinha na posição mais próxima ao soltar
        moveSlider(currentPosition);
        document.onmousemove = null;
        document.onmouseup = null;
    };
});

// Iniciar o slider na posição inicial
moveSlider(currentPosition);
