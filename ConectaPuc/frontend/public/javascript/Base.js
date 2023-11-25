"use strict";
document.addEventListener('DOMContentLoaded', () => {
    // Adiciona um ouvinte de evento de clique aos links
    const forumsLink = document.getElementById('forums-link');
    if (forumsLink) {
        forumsLink.addEventListener('click', () => {
            // Redireciona para a página de listagem de fóruns
            window.location.href = "listar_foruns.html";
        });
    }
});
