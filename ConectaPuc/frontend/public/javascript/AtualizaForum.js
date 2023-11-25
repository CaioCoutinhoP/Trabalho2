window.onload = function () {
    document.getElementById('atualiza').addEventListener('click', function (evento) {
      evento.preventDefault();


      var nome = document.getElementById("nome").value;
      var descricao = document.getElementById("descricao").value;
      var id_forum = localStorage.getItem("id_forum");

      // console.log(nome + "_" + descricao + "_" + id_forum);
  
      if (id_forum) {
        fetch(backendAddress + "api/foruns/update/" + id_forum + '/', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({  // Converter o corpo da requisição em uma string JSON
              "nome": nome,
              "descricao": descricao
        }),
        })
      }
      window.location.href = "listar_foruns.html"
    });
  };
  