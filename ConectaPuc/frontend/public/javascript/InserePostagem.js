"use strict";
onload = () => {
    document.addEventListener("DOMContentLoaded", () => {
        const insereButton = document.getElementById("insere");
        insereButton.addEventListener("click", async (evento) => {
            evento.preventDefault();
            const elements = document.getElementById("meuFormulario").elements;
            const data = {};
            for (let i = 0; i < elements.length; i++) {
                const element = elements[i];
                data[element.name] = element.value;
            }
            try {
                const response = await fetch(backendAddress + "carros/umcarro/", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
                if (response.ok) {
                    document.getElementById('mensagem').innerHTML = 'Dados inseridos com sucesso';
                }
                else {
                    document.getElementById('mensagem').innerHTML = 'Dados inseridos com erro';
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    });
};
