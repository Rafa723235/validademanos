document.addEventListener('DOMContentLoaded', function() {
    const resultadosDiv = document.getElementById('resultados');
    const btnSalvar = document.getElementById('btn-salvar');
    const btnExportar = document.getElementById('btn-exportar');
    const selectStore = document.getElementById('select-store');
    const encarregadoInput = document.getElementById('encarregado');

    // Array para armazenar os resultados
    let resultados = [];

    // Evento de clique para o botão "Salvar"
    btnSalvar.addEventListener('click', function() {
        // Obter dados do formulário
        const store = selectStore.value;
        const encarregado = encarregadoInput.value;
        const quantidade = document.getElementById('quantidade').value;
        const nomeProduto = document.getElementById('nome-produto').value;
        const codigoProduto = document.getElementById('codigo-produto').value;
        const validade = document.getElementById('validade').value;
        const dataHora = new Date().toLocaleString(); // Data e hora atual

        // Criar um objeto com os dados
        const data = {
            Loja: store,
            Encarregado: encarregado,
            'Quantidade do Produto': quantidade,
            'Nome do Produto': nomeProduto,
            'Código Interno do Produto': codigoProduto,
            Validade: validade,
            DataHora: dataHora // Adicionando data e hora
        };

        // Adicionar objeto aos resultados
        resultados.push(data);

        // Atualizar a exibição dos resultados
        exibirResultados();
        
        // Limpar campos do formulário após salvar (exceto "Selecione a loja" e "Encarregado")
        document.getElementById('quantidade').value = '';
        document.getElementById('nome-produto').value = '';
        document.getElementById('codigo-produto').value = '';
        document.getElementById('validade').value = '';
    });

    // Função para exibir os resultados na interface
    function exibirResultados() {
        resultadosDiv.innerHTML = '';

        resultados.forEach((data, index) => {
            // Criar o elemento de resultado
            const resultDiv = document.createElement('div');
            resultDiv.classList.add('resultado-item');

            // Exibir os dados no elemento de resultado
            resultDiv.innerHTML = `
                <p><strong>Loja:</strong> ${data.Loja}</p>
                <p><strong>Encarregado:</strong> ${data.Encarregado}</p>
                <p><strong>Quantidade do Produto:</strong> ${data['Quantidade do Produto']}</p>
                <p><strong>Nome do Produto:</strong> ${data['Nome do Produto']}</p>
                <p><strong>Código Interno do Produto:</strong> ${data['Código Interno do Produto']}</p>
                <p><strong>Validade do Produto:</strong> ${data.Validade}</p>
                <p><strong>Data e Hora:</strong> ${data.DataHora}</p>
                <button class="btn-excluir" data-index="${index}">Lixeira</button>
                <hr>
            `;

            // Adicionar elemento de resultado à lista de resultados
            resultadosDiv.appendChild(resultDiv);
        });
    }

    // Evento de clique para o botão "Exportar para Excel"
    btnExportar.addEventListener('click', function() {
        // Criar um array para armazenar os dados no formato adequado para o Excel
        const exportData = resultados.map(data => ({
            'Loja': data.Loja,
            'Encarregado': data.Encarregado,
            'Quantidade do Produto': data['Quantidade do Produto'],
            'Nome do Produto': data['Nome do Produto'],
            'Validade do Produto': data.Validade,
            'Data e Hora': data.DataHora
        }));

        // Criar workbook do Excel
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(exportData);
        XLSX.utils.book_append_sheet(wb, ws, 'Resultados');

        // Salvar o arquivo Excel
        XLSX.writeFile(wb, 'controle_validade.xlsx');
        
        // Limpar resultados após exportar
        resultados = [];
        resultadosDiv.innerHTML = '';
    });

    // Evento de clique para excluir resultado ao clicar no botão de lixeira
    resultadosDiv.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-excluir')) {
            const index = e.target.getAttribute('data-index');
            resultados.splice(index, 1);
            exibirResultados();
        }
    });
});
