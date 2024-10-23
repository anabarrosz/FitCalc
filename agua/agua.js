function toggleAtividadeFisica(isActive) {
    const atividadeOpcoes = document.getElementById("atividade-opcoes");
    atividadeOpcoes.style.display = isActive ? "block" : "none";
}

const slider = document.getElementById('slider');
const progressLevel = document.getElementById('progress-level');
const items = document.querySelectorAll('.progress-item');

const positions = [0, 50, 100];
let currentPosition = 0;

function selecionarAtividade(pos) {
    currentPosition = pos - 1;
    moveSlider(currentPosition);
}

function moveSlider(positionIndex) {
    const leftPercent = positions[positionIndex] + '%';
    slider.style.left = `calc(${leftPercent} - 7.5px)`;
    progressLevel.style.width = leftPercent;

    items.forEach((item, index) => {
        if (index === positionIndex) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

slider.addEventListener('mousedown', function () {
    document.onmousemove = function (event) {
        const sliderRect = slider.parentElement.getBoundingClientRect();
        let newLeft = event.clientX - sliderRect.left;
        let sliderWidth = sliderRect.width;

        if (newLeft < 0) newLeft = 0;
        if (newLeft > sliderWidth) newLeft = sliderWidth;

        const percent = (newLeft / sliderWidth) * 100;

        if (percent < 25) {
            currentPosition = 0;
        } else if (percent < 75) {
            currentPosition = 1;
        } else {
            currentPosition = 2;
        }

        const leftPercent = positions[currentPosition] + '%';
        slider.style.left = `calc(${leftPercent} - 7.5px)`;
        progressLevel.style.width = leftPercent;
    };

    document.onmouseup = function () {
        moveSlider(currentPosition);
        document.onmousemove = null;
        document.onmouseup = null;
    };
});

moveSlider(currentPosition);

function calcularAgua() {
    const peso = parseFloat(document.getElementById("peso").value);
    const atividade = document.querySelector('input[name="atividade"]:checked').value;

    // Verificar se todos os campos estão preenchidos
    if (isNaN(peso) || !atividade) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }
    
    let fatorAtividade = 1.2;

    if (atividade === "sedentario") {
        fatorAtividade = 35;
    } else {
        const atividadeSelecionada = document.querySelector('input[name="atividade"]:checked');
        if (atividadeSelecionada) {
            const level = document.querySelector(".progress-item.active");
            if (level) {
                const atividadeLevel = level.textContent.trim();
                if (atividadeSelecionada.value === "ativo") {
                    if (atividadeLevel === "Pouco ativo") fatorAtividade = 42;
                    else if (atividadeLevel === "Ativo") fatorAtividade = 49;
                    else if (atividadeLevel === "Muito ativo") fatorAtividade = 56;
                }
            }
        }
    }

    const agua = (peso * fatorAtividade / 1000).toFixed(2);

    console.log(agua);
    console.log(fatorAtividade);

    document.getElementById("agua-resultado").textContent = agua;
    document.getElementById("quantidade-alimento1").textContent = (agua / 0.5).toFixed(0);
    document.getElementById("quantidade-alimento2").textContent = (agua / 0.2).toFixed(0);
   
    document.getElementById("form-container").style.display = "none";
    document.getElementById("resultado-container").style.display = "block";
}
