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
                    displayPostDetails(data);    
                    displayComments(data); 
                }
                
                
                               
            });
        }).catch(function (error) {
            console.error('Erro:', error);
        });
    });
}

function displayPostDetails(post) {
    if (post) {
        console.log(post)
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
        
        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Apagar Postagem';
        deleteButton.id = 'deleteButton'; // Defina um ID para o botão
        deleteButton.onclick = function() {
            delete_post(post.id);
        };
        postElement.appendChild(deleteButton);  


        // Inserir o novo elemento no DOM
        document.getElementById('postsContainer').appendChild(postElement);
    }
}

function delete_post(postId) {
    var token = localStorage.getItem("token");
    fetch(backendAddress + 'api/postagens/delete/' + postId, {
        method: "DELETE",
        headers: {
            'Authorization': 'Bearer ' + token 
        }
    })
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        if (data.success === "Post excluído com sucesso!") {
            window.location.replace("index.html");
        }
    });
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
