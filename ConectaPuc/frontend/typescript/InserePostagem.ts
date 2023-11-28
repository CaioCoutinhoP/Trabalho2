document.addEventListener('DOMContentLoaded', () => {
    createPost();
});

function createPost(): void {
    const btnPost = document.getElementById("btnPost") as HTMLButtonElement | null;
    const msg = document.getElementById("msg") as HTMLDivElement | null;

    if (btnPost) {
        btnPost.addEventListener("click", (event: MouseEvent) => {
            event.preventDefault();

            const titleElement = document.getElementById("title") as HTMLInputElement | null;
            const bodyElement = document.getElementById("body") as HTMLInputElement | null;
            const title = titleElement ? titleElement.value : '';
            const body = bodyElement ? bodyElement.value : '';
            const token = localStorage.getItem('token') || '';
            const forumAtual = localStorage.getItem('id_forum') || '';

            const backendAddress = 'http://127.0.0.1:8000/';

            fetch(backendAddress + "/api/postagens/create/", {
                method: "POST",
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "forum": parseInt(forumAtual),
                    "titulo": title,
                    "conteudo": body,
                    "autor": localStorage.getItem("username")
                }),
            })
            .catch(error => {
                console.error(error);
                if (msg) {
                    msg.innerHTML = "Erro durante a criação do post. Por favor, tente novamente.";
                }
            });
            window.location.href = "listar_postagens.html";
        });
    }
}
