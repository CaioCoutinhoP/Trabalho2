window.onload = function () {
  var atualizaButton = document.getElementById('atualiza');
  if (atualizaButton) {
    atualizaButton.addEventListener('click', function (evento) {
      evento.preventDefault();

      var nomeElement = <HTMLInputElement>document.getElementById("nome");
      var descricaoElement = <HTMLInputElement>document.getElementById("descricao");
      if (nomeElement && descricaoElement) {
        var nome = nomeElement.value;
        var descricao = descricaoElement.value;
        var id_forum = localStorage.getItem("id_forum");

        // Ensure that backendAddress is defined
        var backendAddress = "http://127.0.0.1/8000"; // Replace with your actual backend address

        if (id_forum) {
          fetch(backendAddress + "api/foruns/update/" + id_forum + '/', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                "nome": nome,
                "descricao": descricao
            }),
          });
        }
        window.location.href = "listar_foruns.html";
      }
    });
  }
};
