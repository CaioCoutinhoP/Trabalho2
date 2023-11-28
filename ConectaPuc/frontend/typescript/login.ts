onload = () => {
    (document.getElementById('btnLogin') as HTMLInputElement).addEventListener('click', evento => {
        evento.preventDefault();
        const username: string = (document.getElementById('username') as HTMLInputElement).value;
        const password: string = (document.getElementById('password') as HTMLInputElement).value;
        const msg = (document.getElementById('msg') as HTMLDivElement);
        const backendAddress = 'http://127.0.0.1:8000/';
        fetch(backendAddress + 'contas/token-auth', {
            method: 'POST',
            body: JSON.stringify({
                'username': username,
                'password': password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response: Response) => {
            if (response.ok) {
                return response.json();
            } else {
                if(response.status == 401) {
                    msg.innerHTML = 'Usuário ou senha inválidos.'
                }
                throw new Error('Falha na autenticação');
            }
        })
        .then((data: { token: string }) => {
            const token: string = data.token;
            localStorage.setItem('token', token);
            localStorage.setItem("username", username);
            window.location.replace('listar_foruns.html');

        })
        .catch(erro => { console.log(erro) })
    });
};