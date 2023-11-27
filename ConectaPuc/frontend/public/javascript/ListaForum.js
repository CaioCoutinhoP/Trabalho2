document.addEventListener('DOMContentLoaded', function () {
    // Seu código existente para carregar os fóruns
    var forumList
    // Exemplo de chamada a uma função para carregar os fóruns
    loadForums();
});

function loadForums() {
    const backendAddress = 'http://127.0.0.1:8000/';
    fetch(backendAddress , {
        method: 'GET',
    }).then(function (response) {
        response.json().then(function (forums) {
            var forumList = document.getElementById("forumList");
            forumList.innerHTML = '';

            // Reverse the array to display the latest forums first
            forums.reverse();
            forums.forEach(function (forum) {
                var forumElement = createForumElement(forum);
                forumList.appendChild(forumElement);
            });
        }).catch(function (error) {
            console.error("Erro:", error);
        });
    });
}

function createForumElement(forum) {
    console.log(forum)
    var div1 = document.createElement('div');
    div1.className = 'card m-auto text-bg-dark mb-3';

    var cardBody = document.createElement('div');
    cardBody.className = 'card-body my-2';
    div1.appendChild(cardBody);

    var titlePost = document.createElement('h2');
    titlePost.id = forum.id;

    titlePost.className = 'card-title';
    titlePost.textContent = forum.nome;
    cardBody.appendChild(titlePost);

    var hr = document.createElement('hr');
    cardBody.appendChild(hr);

    var bodyPost = document.createElement('pre');
    bodyPost.className = 'card-text text-bg-dark';
    bodyPost.textContent = forum.descricao;
    cardBody.appendChild(bodyPost);

    var footerPost = document.createElement('div');
    footerPost.className = 'card-footer text-muted text-bg-dark';

    var editForumLink = document.createElement("button");
    editForumLink.style = "text-decoration: none !important";
    editForumLink.href = "edit_forum.html"; 
    editForumLink.textContent = "Editar";
    editForumLink.id = forum.id;

    var deleteForumButton = document.createElement("button");
    deleteForumButton.style = "text0decoration: none !important";
    deleteForumButton.textContent = "Excluir";
    deleteForumButton.id = forum.id;


    div1.appendChild(cardBody);
    div1.appendChild(footerPost);

    var forumLink = document.createElement('p');
    forumLink.style = 'text-decoration: none !important';
    forumLink.className = 'link-dark';
    forumLink.href = 'visualizar_postagens.html';


    titlePost.addEventListener('click', function (event) {
        event.preventDefault();
    
        // Acessa o elemento que foi clicado
        var clickedElement = event.target;
    
        console.log(clickedElement);
        // Obtém o ID do elemento clicado
        var clickedId = clickedElement.id;
    
        localStorage.setItem("id_forum", clickedId);
    
        // Redireciona para o href do forumLink
        window.location.href = forumLink.href;
    });

    editForumLink.addEventListener("click", function (event) {
        event.preventDefault();
        
        var clickedElement = event.target;

        console.log(clickedElement);

        var clickedId = clickedElement.id;

        localStorage.setItem("id_forum", clickedId);
        
        window.location.href = editForumLink.href;
    });

    // Event listener for the delete link
    deleteForumButton.addEventListener('click', function(event) {
    event.preventDefault();

    var forumId = this.id;
    console.log(forumId)

    fetch("http://localhost:8000/api/foruns/delete/"+ forumId, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Falha ao deletar o fórum com ID: ' + forumId);
        }
        return response.text(); // ou .text() se não houver retorno JSON
    })
    .then(data => {
        console.log('Fórum deletado com sucesso:', data);
        // Aqui você pode adicionar código para atualizar a UI após a exclusão bem-sucedida
    })
    .catch(error => console.error('Erro:', error));
    location.reload();

});

    forumLink.appendChild(div1);
    cardBody.appendChild(editForumLink);
    cardBody.appendChild(deleteForumButton);


    

    return forumLink;
}
