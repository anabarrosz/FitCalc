function calcularIMC() {
    const peso = parseFloat(document.getElementById('weight').value);
    const alturaCm = parseFloat(document.getElementById('height').value);
    const imcResultado = document.getElementById('imc-resultado');
    const resultado = document.getElementById('resultado');
    const resultadoContainer = document.getElementById('resultado-container');
    const inputContainer = document.getElementById('inputContainer');
    const formContainerHeader = document.querySelector('.calculator-form h3'); // Seleciona o <h3> do contêiner do formulário

    if (!peso || !alturaCm) {
        alert("Por favor, insira valores válidos para peso e altura.");
        resultadoContainer.style.display = "none"; // Esconde o contêiner do resultado se os dados forem inválidos
        return;
    }

    const alturaM = alturaCm / 100; // Convertendo centímetros para metros
    const imc = peso / (alturaM * alturaM); // Calculando o IMC

    let classificacao;
    
    if (imc < 18.5) {
        classificacao = "Você está abaixo do peso";
    } else if (imc < 24.9) {
        classificacao = "Você está com o peso normal";
    } else if (imc < 29.9) {
        classificacao = "Você está em sobrepeso";
    } else {
        classificacao = "Você está em Obesidade";
    }

    // Exibe o resultado do IMC e a classificação nos elementos corretos
    imcResultado.textContent = imc.toFixed(2);
    resultado.textContent = classificacao;

    // Mostra o contêiner de resultado e oculta o contêiner de entrada
    resultadoContainer.style.display = "block";
    inputContainer.style.display = "none";

    // Altera o texto do <h3> para "Confira seu resultado"
    formContainerHeader.textContent = "Confira seu resultado";

}
