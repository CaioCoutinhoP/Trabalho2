document.addEventListener('DOMContentLoaded', () => {
    // Adiciona um ouvinte de evento de clique aos links
    const createForumLink = document.getElementById('create-forum-link') as HTMLAnchorElement | null;

    if (createForumLink) {
        createForumLink.addEventListener('click', () => {
            // Redireciona para a página de criação de fórum
            window.location.href = "{% url 'criar_forum' %}";
        });
    }

    const editForumLinks = document.querySelectorAll('.edit-forum-link') as NodeListOf<HTMLAnchorElement>;

    editForumLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Extrai o ID do fórum do atributo data-forum-id
            const forumId = link.dataset.forumId;

            if (forumId) {
                // Redireciona para a página de edição de fórum com o ID do fórum
                window.location.href = `{% url 'editar_forum' %}/${forumId}`;
            }
        });
    });

    const deleteForumLinks = document.querySelectorAll('.delete-forum-link') as NodeListOf<HTMLAnchorElement>;

    deleteForumLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Extrai o ID do fórum do atributo data-forum-id
            const forumId = link.dataset.forumId;

            if (forumId) {
                // Redireciona para a página de exclusão de fórum com o ID do fórum
                window.location.href = `{% url 'excluir_forum' %}/${forumId}`;
            }
        });
    });
});
