window.onload = function () {
    document.getElementById('atualiza').addEventListener('click', function (evento) {
      evento.preventDefault();


      var titulo = document.getElementById("nome").value;
      var conteudo = document.getElementById("descricao").value;
      var currentPostId = localStorage.getItem("currentPostId");

      // console.log(nome + "_" + descricao + "_" + id_forum);
  
      if (currentPostId) {
        fetch("http://localhost:8000/api/postagens/update/"+ currentPostId + "/", {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({  // Converter o corpo da requisição em uma string JSON
              "titulo": titulo,
              "conteudo": conteudo
        }),
        })
      }
        window.location.href = "visualizar_postagens.html"
    });
  };
  