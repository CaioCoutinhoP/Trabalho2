window.onload = function () {
    document.getElementById('atualiza').addEventListener('click', function (evento) {
      evento.preventDefault();
      const form = document.getElementById('meuFormulario');
      const elements = form.elements;
      let data = {};
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        data[element.name] = element.value;
      }
  
      // Extrai o ID da URL usando expressão regular
      const url = window.location.href;
      const match = url.match(/\/(\d+)\/$/);
      const id = match ? match[1] : null;
  
      if (id) {
        fetch(backendAddress + "api/foruns/update/" + id + '/', {
          method: 'PUT',
          body: JSON.stringify(data),
          headers: { 'Content-Type': 'application/json' },
        })
          .then(response => {
            if (response.ok) {
              document.getElementById('mensagem').innerHTML = 'Sucesso';
            } else {
              document.getElementById('mensagem').innerHTML = 'Erro: ' + response.status + " " + response.statusText;
            }
          })
          .catch(erro => {
            console.log('Deu erro: ' + erro);
          });
      } else {
        console.log('ID não encontrado na URL');
      }
    });
  };
  