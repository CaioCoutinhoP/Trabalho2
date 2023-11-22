"use strict";
onload = () => {
    document.getElementById('insere').addEventListener('click', evento => {
        evento.preventDefault();
        const elements = document.getElementById('meuFormulario').elements;
        let data = {};
        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            data[element.name] = element.value;
        }
        fetch(backendAddress + "api/comentarios/create/", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => {
            if (response.ok) {
                document.getElementById('mensagem').innerHTML = 'Comentário inserido com sucesso';
            }
            else {
                document.getElementById('mensagem').innerHTML = 'Erro ao inserir o comentário';
            }
        })
            .catch(error => { console.log(error); });
    });
};