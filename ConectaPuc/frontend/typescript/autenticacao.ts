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
        response.json().then((data: { username: string }) => { // Assume the data has a username property
            const usuario = data;

            // Type assertions for DOM elements
            const objLogged = document.getElementById('logged') as HTMLDivElement | null;
            const objUnlogged = document.getElementById('unlogged') as HTMLDivElement | null;
            const spanElement = document.getElementById('identificacao') as HTMLSpanElement | null;

            if (response.ok) {
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
    .catch((erro: Error) => {
        console.log('[setLoggedUser] deu erro: ' + erro.message);
    });
});
