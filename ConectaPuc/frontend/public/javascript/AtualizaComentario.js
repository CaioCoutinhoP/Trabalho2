"use strict";
onload = () => {
    document.getElementById('atualiza').addEventListener('click', (evento) => {
        evento.preventDefault();
        // Busque o ID do comentário do atributo personalizado
        const comentarioElement = document.getElementById('comentario');
        if (comentarioElement) {
            const comentarioID = comentarioElement.getAttribute('data-comentario-id');
            const form = document.getElementById('meuFormulario');
            const elements = form.elements;
            let data = {};
            for (let i = 0; i < elements.length; i++) {
                const element = elements[i];
                data[element.name] = element.value;
            }
            fetch(`/api/comentarios/update/${comentarioID}/`, {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' },
            })
                .then(response => {
                if (response.ok) {
                    document.getElementById('mensagem').innerHTML = 'Sucesso';
                }
                else {
                    document.getElementById('mensagem').innerHTML = 'Erro: ' + response.status + ' ' + response.statusText;
                }
            })
                .catch(erro => {
                console.log('Deu erro: ' + erro);
            });
        }
    });
};
