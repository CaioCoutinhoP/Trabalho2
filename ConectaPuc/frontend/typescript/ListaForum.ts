document.addEventListener('DOMContentLoaded', function () {
    loadForums();
});

function loadForums(): void {
    const backendAddress = 'http://127.0.0.1:8000/';
    fetch(backendAddress, {
        method: 'GET',
    }).then(function (response) {
        response.json().then(function (forums) {
            const forumList = document.getElementById("forumList") as HTMLDivElement | null;
            if (forumList) {
                forumList.innerHTML = '';
                forums.reverse();
                forums.forEach(function (forum: any) {
                    const forumElement = createForumElement(forum);
                    forumList.appendChild(forumElement);
                });
            }
        }).catch(function (error: any) {
            console.error("Erro:", error);
        });
    });
}

function createForumElement(forum: any): HTMLElement {
    console.log(forum);
    const div1 = document.createElement('div');
    div1.className = 'card m-auto text-bg-dark mb-3';
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body my-2';
    div1.appendChild(cardBody);

    const titlePost = document.createElement('h2');
    titlePost.id = forum.id.toString();
    titlePost.className = 'card-title';
    titlePost.textContent = forum.nome;
    cardBody.appendChild(titlePost);

    const hr = document.createElement('hr');
    cardBody.appendChild(hr);

    const bodyPost = document.createElement('pre');
    bodyPost.className = 'card-text text-bg-dark';
    bodyPost.textContent = forum.descricao;
    cardBody.appendChild(bodyPost);

    const footerPost = document.createElement('div');
    footerPost.className = 'card-footer text-muted text-bg-dark';
    div1.appendChild(footerPost);

    const editForumLink = document.createElement("button");
    editForumLink.style.textDecoration = "none";
    editForumLink.addEventListener('click', function(){
        window.location.href = "edit_forum.html";
    });
    editForumLink.textContent = "Editar";
    editForumLink.id = forum.id.toString();

    const deleteForumButton = document.createElement("button");
    deleteForumButton.style.textDecoration = "none";
    deleteForumButton.textContent = "Excluir";
    deleteForumButton.id = forum.id.toString();

    // Event listeners and other logic...

    return div1;
}
