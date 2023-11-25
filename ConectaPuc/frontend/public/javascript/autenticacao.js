window.addEventListener('load', () => {
    const token = localStorage.getItem('token');
    const backendAddress = 'http://127.0.0.1:8000/';
    
    fetch(backendAddress + 'contas/token-auth', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => {
        response.json().then(data => {
            const usuario = data;

            // Verifica se os elementos existem no DOM antes de acessar propriedades
            const objLogged = document.getElementById('logged');
            const objUnlogged = document.getElementById('unlogged');
            const spanElement = document.getElementById('identificacao');

            if (response.ok) {
                // Exibe ou oculta os elementos conforme necessário
                if (objLogged && objUnlogged) {
                    objLogged.classList.remove('invisivel');
                    objLogged.classList.add('visivel');
                    objUnlogged.classList.remove('visivel');
                    objUnlogged.classList.add('invisivel');
                }
            } else {
                if (objLogged && objUnlogged) {
                    objUnlogged.classList.remove('invisivel');
                    objUnlogged.classList.add('visivel');
                    objLogged.classList.remove('visivel');
                    objLogged.classList.add('invisivel');
                }
                usuario.username = 'visitante';
            }

            if (spanElement) {
                spanElement.innerHTML = usuario.username;
            }
        });
    })
    .catch(erro => {
        console.log('[setLoggedUser] deu erro: ' + erro);
    });
});
