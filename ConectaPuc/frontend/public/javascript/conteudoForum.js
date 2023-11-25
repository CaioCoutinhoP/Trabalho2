document.addEventListener('DOMContentLoaded', async () => {
    const forumDetailsContainer = document.getElementById('forum-details');
    const postList = document.getElementById('post-list');
    const commentList = document.getElementById('comment-list');
    const backendAddress = 'http://127.0.0.1:8000/';

    try {
        // Obter detalhes do fórum (substitua pela sua URL de API)
        const forumResponse = await fetch(backendAddress + 'api/postagens/');
        if (!forumResponse.ok) {
            throw new Error('Erro ao obter detalhes do fórum.');
        }

        const forumDetails = await forumResponse.json();

        // Exibir detalhes do fórum
        forumDetailsContainer.innerHTML = `
            <h3>Detalhes do Fórum</h3>
            <p>Nome: ${forumDetails.nome}</p>
            <p>Descrição: ${forumDetails.descricao}</p>
            <!-- Adicione outros detalhes conforme necessário -->
        `;

        // Obter lista de postagens do fórum (substitua pela sua URL de API)
        const postResponse = await fetch(backendAddress + 'api/postagens/');
        if (!postResponse.ok) {
            throw new Error('Erro ao obter lista de postagens.');
        }

        const posts = await postResponse.json();

        // Iterar sobre a lista de postagens e exibir
        for (const post of posts) {
            const li = document.createElement('li');
            li.innerHTML = `
                <h4>${post.titulo}</h4>
                <p>${post.conteudo}</p>
                <!-- Adicione outros detalhes da postagem conforme necessário -->
            `;
            postList.appendChild(li);

            // Obter lista de comentários da postagem (substitua pela sua URL de API)
            const commentResponse = await fetch(`/api/listar-comentarios-da-postagem/${post.id}/`);
            if (!commentResponse.ok) {
                throw new Error(`Erro ao obter comentários da postagem ${post.id}.`);
            }

            const comments = await commentResponse.json();

            // Iterar sobre a lista de comentários e exibir
            for (const comment of comments) {
                const commentLi = document.createElement('li');
                commentLi.innerHTML = `
                    <p>${comment.conteudo}</p>
                    <!-- Adicione outros detalhes do comentário conforme necessário -->
                `;
                commentList.appendChild(commentLi);
            }
        }
    } catch (error) {
        console.error('Erro ao carregar a página:', error);
    }
});
