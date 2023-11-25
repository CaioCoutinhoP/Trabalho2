// Exemplo de uma função para carregar detalhes da postagem e comentários
function loadPostAndComments() {
    const backendAddress = 'http://127.0.0.1:8000/';

    // Substitua 'api/posts/{post_id}' pelo endpoint correto para obter uma postagem e seus comentários
    fetch(backendAddress + 'api/postagens/', {
        method: 'GET',
    }).then(function (response) {
        response.json().then(function (data) {
            displayPostDetails(data.post);
            displayComments(data.comments);
        }).catch(function (error) {
            console.error('Erro:', error);
        });
    });
}

function displayPostDetails(post) {
    if (post) {
        document.getElementById('title').textContent = post.title || '';
        document.getElementById('postTitle').textContent = post.title || '';
        document.getElementById('postContent').textContent = post.content || '';
        document.getElementById('postAuthor').textContent = 'Autor: ' + (post.author || '');
        document.getElementById('postDate').textContent = 'Data de Publicação: ' + (post.date || '');
    }
}


function displayComments(comments) {
    if (comments && Array.isArray(comments)) {
        comments.forEach(function (comment) {
            var commentElement = createCommentElement(comment);
            document.getElementById('comments').appendChild(commentElement);
        });
    }
}


// Exemplo de uma função para criar elementos de comentário
function createCommentElement(comment) {
    var commentDiv = document.createElement('div');
    commentDiv.className = 'comment';

    // Crie elementos HTML para exibir os detalhes do comentário (por exemplo, autor, conteúdo, data, etc.)
    // Exemplo:
    var commentAuthor = document.createElement('p');
    commentAuthor.textContent = 'Autor: ' + comment.author;
    commentDiv.appendChild(commentAuthor);

    var commentContent = document.createElement('p');
    commentContent.textContent = comment.content;
    commentDiv.appendChild(commentContent);

    var commentDate = document.createElement('p');
    commentDate.textContent = 'Data: ' + comment.date;
    commentDiv.appendChild(commentDate);

    return commentDiv;
}

// Carregue detalhes da postagem e comentários quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function () {
    loadPostAndComments();
});
