window.onload = function () {
  var atualizaButton = document.getElementById('atualiza');
  if (atualizaButton) {
    atualizaButton.addEventListener('click', function (evento) {
      evento.preventDefault();


      var conteudo: string = (<HTMLInputElement>document.getElementById("descricao")).value;
      var currentcomentariotId: string | null = localStorage.getItem("currentcomentariotId");

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
        window.location.href = "listar_postagens.html"
      }
    );
  };
}