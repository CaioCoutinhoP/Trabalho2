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

            const formData = new FormData();
            formData.append('titulo', title);  // Corrigir o nome do campo para 'titulo'
            formData.append('conteudo', body);  // Corrigir o nome do campo para 'conteudo'

            const backendAddress = 'http://127.0.0.1:8000/';

            fetch(backendAddress + "api/postagens/create/", {
                method: "POST",
                headers: {
                    'Authorization': 'Bearer ' + token,
                },
                body: formData,
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao criar postagem');
                }
                return response.json();
            })
            .then(data => {
                if (data.response === "Post Criado com Sucesso!") {
                    window.location.replace("vizualizar_postagem.html");
                } else {
                    throw new Error("Falha na criação do post");
                }
            })
            .catch(error => {
                console.error(error);
                msg.innerHTML = "Erro durante a criação do post. Por favor, tente novamente.";
            });
        });
    }
}
