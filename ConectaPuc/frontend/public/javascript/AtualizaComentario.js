window.onload = function () {
    document.getElementById('atualiza').addEventListener('click', function (evento) {
      evento.preventDefault();


      var conteudo = document.getElementById("descricao").value;
      var currentcomentariotId = localStorage.getItem("currentcomentariotId");

      // console.log(nome + "_" + descricao + "_" + id_forum);
  
      if (currentcomentariotId) {
        fetch("http://localhost:8000/api/comentarios/update/"+ currentcomentariotId + "/", {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({  // Converter o corpo da requisição em uma string JSON
              "texto": conteudo
        }),
        })
      }
        window.location.href = "visualizar_postagens.html"
    });
  };
  