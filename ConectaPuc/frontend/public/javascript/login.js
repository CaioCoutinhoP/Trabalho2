"use strict";
onload = () => {
    document.getElementById('btnLogin').addEventListener('click', evento => {
        evento.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const msg = document.getElementById('msg');
        const backendAddress = 'http://127.0.0.1:8000/';
        fetch(backendAddress + 'contas/token-auth/', {
            method: 'POST',
            body: JSON.stringify({
                'username': username,
                'password': password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
            if (response.ok) {
                return response.json();
            }
            else {
                if (response.status == 401) {
                    msg.innerHTML = 'Usuário ou senha inválidos.';
                }
                throw new Error('Falha na autenticação');
            }
        })
            .then((data) => {
            const token = data.token;
            localStorage.setItem('token', token);
            window.location.replace('base.html');
        })
            .catch(erro => { console.log(erro); });
    });
};
