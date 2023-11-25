// Exemplo de uma função para carregar detalhes da postagem e comentários
function loadPostAndComments() {
    const backendAddress = 'http://127.0.0.1:8000/';

    // Substitua 'api/posts/{post_id}' pelo endpoint correto para obter uma postagem e seus comentários
    fetch(backendAddress + 'api/postagens/', {
        method: 'GET',
        
    }).then(function (response) {
        response.json().then(function (datas) {
            datas.forEach(function (data) {
                var forumatual = localStorage.getItem("id_forum")
            
                if (data.forum == forumatual) {
                    var postElement = displayPostDetails(data);
                    getcomentariosById(data.id, postElement); // Passar postElement como argumento
                }
            });
        }).catch(function (error) {
            console.error('Erro:', error);
        });
    });
}

function displayPostDetails(post) {
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
        authorElement.textContent = 'Autor: ' + post.autor;
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

function displayComments(comments) {
    if (comments && Array.isArray(comments)) {
        comments.forEach(function (comment) {
            var commentElement = createCommentElement(comment);
            document.getElementById('comments').appendChild(commentElement);
        });
    }
}

function getcomentariosById(id, postElement){
    fetch(backendAddress + 'api/postagens/'+id+'/comentarios/', {
        method: 'GET',
    }).then(function (response) {
        response.json().then(function (comentarios) {
            comentarios.forEach(function (comentario) {
                var commentElement = createCommentElement(comentario);
                postElement.appendChild(commentElement); // Anexar ao elemento do post
            });
        }).catch(function (error) {
            console.error('Erro:', error);
        });
    });
}
// Exemplo de uma função para criar elementos de comentário
function createCommentElement(comment) {
    console.log(comment)
    var commentDiv = document.createElement('div');
    commentDiv.className = 'comments';

    // Crie elementos HTML para exibir os detalhes do comentário (por exemplo, autor, conteúdo, data, etc.)
    // Exemplo:
    var commentAuthor = document.createElement('p');
    commentAuthor.textContent = 'Autor: ' + comment.autor;
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