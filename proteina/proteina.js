// Função para arredondar conforme a regra especificada
function arredondar(valor) {
    const decimal = valor - Math.floor(valor);
    if (decimal >= 0.60) {
        return Math.ceil(valor);
    } else {
        return Math.floor(valor);
    }
}

// Função para calcular a proteína com base nas informações fornecidas pelo usuário
function calcularProteina() {
    const peso = parseFloat(document.getElementById("peso").value);
    const idade = parseInt(document.getElementById("idade").value);
    const altura = parseFloat(document.getElementById("altura").value);
    const sexo = document.getElementById("sexo").value;
    const objetivo = document.getElementById("objetivo").value;
    const atividade = document.querySelector('input[name="atividade"]:checked').value;

    // Verificar se todos os campos estão preenchidos
    if (isNaN(peso) || isNaN(idade) || isNaN(altura) || !sexo || !objetivo || !atividade) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }

    let proteinaBase;

    // Definir a proteína base com base no sexo
    if (sexo === 'masculino') {
        proteinaBase = peso * 1.0; // Exemplo: 1g de proteína por kg de peso para homens
    } else {
        proteinaBase = peso * 0.8; // Exemplo: 0.8g de proteína por kg de peso para mulheres
    }

    // Ajustar a proteína com base no objetivo
    if (objetivo === 'ganho_massa') {
        proteinaBase *= 1.5; // Ganho de massa muscular requer mais proteína
    } else if (objetivo === 'emagrecimento') {
        proteinaBase *= 1.2; // Ajuste de proteína para emagrecimento
    } else if (objetivo === 'manutencao') {
        proteinaBase *= 1.0; // Manutenção mantém o nível padrão de proteína
    }

    // Ajustar com base no nível de atividade física
    if (atividade === 'sedentario') {
        proteinaBase *= 0.9; // Reduz proteína para estilo de vida sedentário
    } else if (atividade === 'ativo') {
        proteinaBase *= 1.2; // Aumenta proteína para estilo de vida ativo
    } else if (atividade === 'muito_ativo') {
        proteinaBase *= 1.4; // Aumenta ainda mais para estilo de vida muito ativo
    }

    // Exibir o resultado arredondado
    const proteinaFinal = arredondar(proteinaBase);
    document.getElementById("proteina-resultado").textContent = proteinaFinal + "g";

    // Mostrar o resultado e esconder o formulário
    document.getElementById("resultado-container").style.display = "block";
    document.getElementById("form-container").style.display = "none";
}

// Função para mostrar ou esconder as opções de atividade física
function toggleAtividadeFisica(isActive) {
    const atividadeOpcoes = document.getElementById("atividade-opcoes");
    if (isActive) {
        atividadeOpcoes.style.display = "block";
    } else {
        atividadeOpcoes.style.display = "none";
    }
}

// Função para selecionar a atividade e ajustar a cor dos itens
function selecionarAtividade(element) {
    const itens = document.querySelectorAll('.progress-item');
    itens.forEach(item => item.style.backgroundColor = '#00425c');
    
    element.style.backgroundColor = '#3da9a9';  // Cor muda conforme o selecionado
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
        if (index === positionIndex) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
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
