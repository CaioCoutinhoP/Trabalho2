document.addEventListener('DOMContentLoaded', () => {
    // Adiciona um ouvinte de evento de clique aos links
    const forumsLink = document.getElementById('forums-link') as HTMLAnchorElement | null;
    

    if (forumsLink) {
        forumsLink.addEventListener('click', () => {
            // Redireciona para a página de listagem de fóruns
            window.location.href = "listar_foruns.html";
        });
    }
});
