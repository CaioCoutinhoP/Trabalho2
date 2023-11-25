"use strict";
onload = (eventon) => {
    document.getElementById('logout').addEventListener('click', (evento) => {
        const token = localStorage.getItem('token');
        const backendAddress = 'http://127.0.0.1:8000/';
        fetch(backendAddress + 'contas/token-auth', {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
            const mensagem = document.getElementById('mensagem');
            if (response.ok)
                window.location.assign('/');
            else
                mensagem.innerHTML = 'Erro ' + response.status;
        })
            .catch(erro => { console.log(erro); });
    });
};
