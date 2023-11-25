// Exemplo de uma função para carregar detalhes da postagem e comentários
async function loadPostAndComments() {
    const backendAddress = 'http://127.0.0.1:8000/';

    try {
        let response = await fetch(backendAddress + 'api/postagens/', { method: 'GET' });
        let datas = await response.json();

        for (const data of datas) {
            var forumatual = localStorage.getItem("id_forum");

            if (data.forum == forumatual) {
                var postElement = await displayPostDetails(data);
                await getcomentariosById(data.id, postElement);
            }
        }
    } catch (error) {
        console.error('Erro:', error);
    }
}

async function displayPostDetails(post) {
    if (post) {
        // Criar um novo elemento div para a postagem
        var postElement = document.createElement('div');
        postElement.classList.add('post');
        // Adicionar o título da postagem
        var titleElement = document.createElement('h2');
        titleElement.textContent = post.titulo;
        postElement.appendChild(titleElement);

        // Adicionar o conteúdo da postagem
        var contentElement = document.createElement('p');
        contentElement.textContent = post.conteudo;
        postElement.appendChild(contentElement);

        // Adicionar o autor da postagem
        var authorElement = document.createElement('p');
        authorElement.textContent = 'Autor: ' + await getUsernameByToken(post.autor);
        postElement.appendChild(authorElement);

        // Adicionar a data de publicação
        var dateElement = document.createElement('p');
        dateElement.textContent = 'Data de Publicação: ' + post.data_postagem;
        postElement.appendChild(dateElement);

        var createCommentButton = document.createElement('button');
        createCommentButton.textContent = 'Criar Comentário';
        createCommentButton.addEventListener('click', function() {
            redirectToCreateComment(post.id); // Redirecionar para a tela de criação de comentários, passando o ID da postagem
        });
        postElement.appendChild(createCommentButton);
        // Inserir o novo elemento no DOM
        document.getElementById('postsContainer').appendChild(postElement);
        return postElement;
      
    }
}


function redirectToCreateComment(postId) {
    // Armazenar o ID da postagem atual localmente (pode ser localStorage ou sessionStorage)
    localStorage.setItem('currentPostId', postId);

    // Redirecionar para a tela de criação de comentários
    window.location.href = "adicionar_comentario.html";
}

async function displayComments(comments) {
    if (comments && Array.isArray(comments)) {
        for (const comment of comments) {
            var commentElement = await createCommentElement(comment);
            document.getElementById('comments').appendChild(commentElement);
        }
    }
}


function getUsernameByToken(autor) {
    return fetch(backendAddress + 'contas/token-auth', {
        method: 'GET',
        headers: {
            'Authorization': "token " + autor
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.json();  // Converte a resposta em JSON
    })
    .then(data => data.username) // Retorna o nome do usuário
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
}


async function getcomentariosById(id, postElement){
    try {
        let response = await fetch(backendAddress + 'api/postagens/' + id + '/comentarios/', {
            method: 'GET',
        });
        let comentarios = await response.json();

        for (const comentario of comentarios) {
            var commentElement = await createCommentElement(comentario);
            postElement.appendChild(commentElement);
        }
    } catch (error) {
        console.error('Erro:', error);
    }
}

// Exemplo de uma função para criar elementos de comentário
async function createCommentElement(comment) {
    var commentDiv = document.createElement('div');
    commentDiv.className = 'comments';

    // Crie elementos HTML para exibir os detalhes do comentário (por exemplo, autor, conteúdo, data, etc.)
    // Exemplo:
    var commentAuthor = document.createElement('p');
    commentAuthor.textContent = 'Autor: ' + await getUsernameByToken(comment.autor);
    commentDiv.appendChild(commentAuthor);

    var commentContent = document.createElement('p');
    commentContent.textContent = comment.texto;
    commentDiv.appendChild(commentContent);

    var commentDate = document.createElement('p');
    commentDate.textContent = 'Data: ' + comment.data_criacao;
    commentDiv.appendChild(commentDate);

    return commentDiv;
}

// Carregue detalhes da postagem e comentários quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function () {
    loadPostAndComments();
});