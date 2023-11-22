"use strict";
function exibeListaDePostagens() {
    fetch(backendAddress + "forum/postagens/")
        .then(response => response.json())
        .then(postagens => {
        let campos = ['titulo', 'conteudo', 'autor', 'data'];
        let tbody = document.getElementById('idtbody');
        tbody.innerHTML = "";
        for (let postagem of postagens) {
            let tr = document.createElement('tr');
            for (let i = 0; i < campos.length; i++) {
                let td = document.createElement('td');
                let texto = document.createTextNode(postagem[campos[i]]);
                td.appendChild(texto);
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        }
    })
        .catch(error => {
        console.error("Erro:", error);
    });
}
function exibeComentariosDaPostagem(postagemId) {
    fetch(backendAddress + `forum/comentarios/${postagemId}`)
        .then(response => response.json())
        .then(comentarios => {
        let campos = ['conteudo', 'autor', 'data'];
        let tbody = document.getElementById('idtbody');
        tbody.innerHTML = "";
        for (let comentario of comentarios) {
            let tr = document.createElement('tr');
            for (let i = 0; i < campos.length; i++) {
                let td = document.createElement('td');
                let texto = document.createTextNode(comentario[campos[i]]);
                td.appendChild(texto);
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        }
    })
        .catch(error => {
        console.error("Erro:", error);
    });
}
function exibePostagensEComentariosDoForum(forumId) {
    // Limpe o conteúdo atual da tabela de postagens/comentários, se houver
    const tbody = document.getElementById('postagens-comentarios-tbody');
    if (tbody) {
        tbody.innerHTML = '';
    }
    // Faça uma solicitação para buscar as postagens associadas ao fórum
    fetch(backendAddress + `forum/${forumId}/postagens`)
        .then(response => response.json())
        .then(postagens => {
        for (let postagem of postagens) {
            // Crie uma linha na tabela para cada postagem
            const tr = document.createElement('tr');
            const tdPostagem = document.createElement('td');
            tdPostagem.textContent = postagem.titulo; // Supondo que 'titulo' é o campo da postagem
            tr.appendChild(tdPostagem);
            if (tbody) {
                tbody.appendChild(tr);
            }
            // Adicione um evento de clique na linha da postagem para exibir os comentários
            tr.addEventListener('click', function () {
                exibeComentariosDaPostagem(postagem.id); // Supondo que 'id' seja o campo da postagem
            });
        }
    })
        .catch(error => {
        console.error("Erro ao buscar postagens:", error);
    });
    // Agora você pode adicionar mais lógica para exibir comentários ou personalizar a interface de usuário conforme necessário.
}
function exibeNomeDosForums() {
    fetch(backendAddress + "forum/lista/")
        .then(response => response.json())
        .then(forums => {
        let campos = ['nome', 'descricao', 'moderador'];
        let tbody = document.getElementById('idtbody');
        tbody.innerHTML = "";
        for (let forum of forums) {
            let tr = document.createElement('tr');
            for (let i = 0; i < campos.length; i++) {
                let td = document.createElement('td');
                let texto = document.createTextNode(forum[campos[i]]);
                td.appendChild(texto);
                tr.appendChild(td);
            }
            // Adicione um evento de clique para carregar postagens e comentários associados a esse fórum
            tr.addEventListener('click', function () {
                const forumId = forum.id; // Supondo que 'id' é o campo que contém o ID do fórum
                exibePostagensEComentariosDoForum(forumId);
            });
            tbody.appendChild(tr);
        }
    })
        .catch(error => {
        console.error("Erro:", error);
    });
}
