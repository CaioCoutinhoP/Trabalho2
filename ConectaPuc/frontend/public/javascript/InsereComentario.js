document.addEventListener('DOMContentLoaded', function () {
    create_comment();
});

function create_comment() {
    const btnComment = document.getElementById("btnComment");
    const commentMsg = document.getElementById("commentMsg");

    if (btnComment) {
        btnComment.addEventListener("click", function (event) {
            event.preventDefault();
            const commentBody = document.getElementById("body").value;
            const token = localStorage.getItem('token');
            const postId =localStorage.getItem('currentPostId'); /* obtenha o ID da postagem atual, você pode armazenar isso localmente ou obter de outra forma */

            const backendAddress = 'http://127.0.0.1:8000/';
            console.log(commentBody);
            console.log(token);
            console.log(postId);

            fetch(backendAddress + "api/comentarios/create/", {
                method: "POST",
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "autor": localStorage.getItem("username"),
                    "postagem": parseInt(postId),
                    "texto": commentBody
                }),
            })
            .catch(error => {
                console.error(error);
                commentMsg.innerHTML = "Erro durante a criação do comentário. Por favor, tente novamente.";
            });
            window.location.href = "listar_postagens.html";

        });
    }
}
