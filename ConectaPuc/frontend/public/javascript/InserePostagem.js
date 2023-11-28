document.addEventListener('DOMContentLoaded', function () {
    create_post();
});

function create_post() {
    const btnPost = document.getElementById("btnPost");
    const msg = document.getElementById("msg");

    if (btnPost) {
        btnPost.addEventListener("click", function (event) {
            event.preventDefault();
            const title = document.getElementById("title").value;
            const body = document.getElementById("body").value;
            const token = localStorage.getItem('token');
            const forumatual = localStorage.getItem('id_forum');


            const backendAddress = 'http://127.0.0.1:8000/';

            fetch(backendAddress+ "/api/postagens/create/", {
                method: "POST",
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'  // Adicionar este cabeçalho
                },
                body: JSON.stringify({  // Converter o corpo da requisição em uma string JSON
                    "forum": parseInt(forumatual),
                    "titulo": title,
                    "conteudo": body,
                    "autor": localStorage.getItem("username")
                }),
            })

            .catch(error => {
                console.error(error);
                msg.innerHTML = "Erro durante a criação do post. Por favor, tente novamente.";
            });
            window.location.href = "listar_postagens.html";

        });
    }
}
