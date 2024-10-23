function calcularTMB() {
    const sexo = document.getElementById('sexo').value;
    const idade = parseInt(document.getElementById('idade').value);
    const peso = parseFloat(document.getElementById('peso').value);
    const altura = parseFloat(document.getElementById('altura').value);
 
    let tmb;
 
    if (sexo === 'masculino') {
        // Fórmula de Harris-Benedict para homens
        tmb = 88.36 + (13.4 * peso) + (4.8 * altura) - (5.7 * idade);
    } else if (sexo === 'feminino') {
        // Fórmula de Harris-Benedict para mulheres
        tmb = 447.6 + (9.2 * peso) + (3.1 * altura) - (4.3 * idade);
    }
 
    if (!isNaN(tmb)) {
        // Substitui o conteúdo do container pelo resultado
        const formContainer = document.getElementById('form-container');
        formContainer.innerHTML = `
        <div class="resultado" id="resultado-container">
                <h3>Confira seu resultado</h3>
                <div class="barra-de-prog">
                    <img src="../img/final.svg" alt="">
                    </div>
                <p class="res">Essa é a quantidade de calorias que seu corpo precisa:</p>
           
             <div class="resultado-container">
                <p class="resultado-destaque">Você deve consumir cerca de <strong>${tmb.toFixed(2)}kcal</strong> de Calorias por dia.</p>
                 </div>
                 <p class="disclaimer">Atenção: O resultado desta ferramenta não dispensa a consulta com um médico ou profissional especializado.</p>
             
            </div>
        `;
    } else {
        alert('Por favor, preencha todos os campos corretamente.');
    }
}
 