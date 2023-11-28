document.addEventListener('DOMContentLoaded', () => {
    createComment();
});

function createComment(): void {
    const btnComment = document.getElementById("btnComment") as HTMLButtonElement | null;
    const commentMsg = document.getElementById("commentMsg") as HTMLDivElement | null;

    if (btnComment) {
        btnComment.addEventListener("click", (event: MouseEvent) => {
            event.preventDefault();
            const commentBodyElement = document.getElementById("body") as HTMLInputElement | null;
            const commentBody = commentBodyElement ? commentBodyElement.value : '';
            const token = localStorage.getItem('token') || '';
            const postId = localStorage.getItem('currentPostId') || ''; 

            const backendAddress = 'http://127.0.0.1:8000/';

            console.log(commentBody, token, postId);

            fetch(backendAddress + "api/comentarios/create/", {
                method: "POST",
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "autor": token,
                    "postagem": parseInt(postId),
                    "texto": commentBody
                }),
            })
            .catch(error => {
                console.error(error);
                if (commentMsg) {
                    commentMsg.innerHTML = "Erro durante a criação do comentário. Por favor, tente novamente.";
                }
            });
            window.location.href = "listar_postagens.html";
        });
    }
}
