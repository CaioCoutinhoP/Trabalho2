window.onload = function (){
  const atualizaButton = document.getElementById('atualiza');
  if (atualizaButton) {
      atualizaButton.addEventListener('click', function (evento) {
          evento.preventDefault();

          const tituloElement = document.getElementById("nome");
          const conteudoElement = document.getElementById("descricao");
          const currentPostId = localStorage.getItem("currentPostId");

          // console.log(nome + "_" + descricao + "_" + id_forum);

          if (currentPostId && tituloElement && conteudoElement) {
              const titulo = tituloElement.value;
              const conteudo = conteudoElement.value;

              fetch("http://localhost:8000/api/postagens/update/" + currentPostId + "/", {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ 
                      "titulo": titulo,
                      "conteudo": conteudo
                  }),
              });
          }
          window.location.href = "listar_postagens.html";
      });
  }
};
