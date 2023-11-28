
// Define interfaces for your data structures
interface Post {
    id: number;
    titulo: string;
    conteudo: string;
    autor: string;
    data_postagem: string;
    forum: number;
}

interface Comment {
    id: number;
    autor: string;
    texto: string;
    data_criacao: string;
}

// Example of a function to load post details and comments
async function loadPostAndComments(): Promise<void> {
    const backendAddress = 'http://127.0.0.1:8000/';

    try {
        let response = await fetch(backendAddress + 'api/postagens/', { method: 'GET' });
        let datas: Post[] = await response.json();

        for (const data of datas) {
            let forumatual: string | null = localStorage.getItem("id_forum");

            if (data.forum.toString() === forumatual) {
                let postElement = await displayPostDetails(data);
                await getcomentariosById(data.id, postElement);
            }
        }
    } catch (error) {
        console.error('Erro:', error);
    }
}

async function displayPostDetails(post: Post): Promise<HTMLDivElement | undefined> {
    if (post) {
        let postElement: HTMLDivElement = document.createElement('div');
        postElement.classList.add('post');

        // Add the post title
        let titleElement: HTMLHeadingElement = document.createElement('h2');
        titleElement.textContent = post.titulo;
        postElement.appendChild(titleElement);

        // Add the post content
        let contentElement: HTMLParagraphElement = document.createElement('p');
        contentElement.textContent = post.conteudo;
        postElement.appendChild(contentElement);

        // Add the post author
        let authorElement: HTMLParagraphElement = document.createElement('p');
        authorElement.textContent = 'Autor: ' + post.autor;
        postElement.appendChild(authorElement);

        // Add the publication date
        let dateElement: HTMLParagraphElement = document.createElement('p');
        dateElement.textContent = 'Data de Publicação: ' + post.data_postagem;
        postElement.appendChild(dateElement);

        let currentUsername: string | null = localStorage.getItem("username");
        let postAuthor: string = post.autor;
        if (currentUsername === postAuthor || currentUsername === "admin") {
            // ... Buttons and event listeners ...
        }

        let createCommentButton: HTMLButtonElement = document.createElement('button');
        createCommentButton.textContent = 'Criar Comentário';
        createCommentButton.addEventListener('click', function () {
            redirectToCreateComment(post.id);
        });
        postElement.appendChild(createCommentButton);

        document.getElementById('postsContainer')!.appendChild(postElement);
        return postElement;
    }
}

function redirectToCreateComment(postId: number): void {
    localStorage.setItem('currentPostId', postId.toString());
    window.location.href = "adicionar_comentario.html";
}

async function displayComments(comments: Comment[]): Promise<void> {
    if (comments && Array.isArray(comments)) {
        for (const comment of comments) {
            let commentElement: HTMLDivElement = await createCommentElement(comment);
            document.getElementById('comments')!.appendChild(commentElement);
        }
    }
}

function getUsernameByToken(autor: string): Promise<string | undefined> {
    const backendAddress = "http://127.0.0.1/8000";
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
        return response.json();
    })
    .then(data => data.username)
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
}

async function getcomentariosById(id: number, postElement: HTMLDivElement): Promise<void> {
    // ... Similar to the earlier functions ...
}

async function getCurrentUsername(): Promise<string | null> {
    let token: string | null = localStorage.getItem("token");
    if (!token) {
        return null;
    }
    try {
        let username: string | undefined = await getUsernameByToken(token);
        return username ?? null;
    } catch (error) {
        console.error('Erro ao obter o nome de usuário:', error);
        return null;
    }
}

async function createCommentElement(comment: Comment): Promise<HTMLDivElement> {
    let commentDiv: HTMLDivElement = document.createElement('div');
    commentDiv.className = 'comments';

    // Create HTML elements to display comment details
    // ... Similar to the earlier functions ...

    return commentDiv;
}

// Load post details and comments when the DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    loadPostAndComments();
});
