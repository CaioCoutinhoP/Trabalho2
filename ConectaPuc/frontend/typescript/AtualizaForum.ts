onload = () => {
    (document.getElementById('atualiza') as HTMLButtonElement).addEventListener('click', (evento) => {
      evento.preventDefault();
      
      // Busque o ID do fórum do atributo personalizado
      const forumElement = document.getElementById('forum');
      
      if (forumElement) {
        const forumID = forumElement.getAttribute('data-forum-id');
      
        const form = document.getElementById('meuFormulario') as HTMLFormElement;
        const elements = form.elements;
        let data: Record<string, string> = {};
      
        for (let i = 0; i < elements.length; i++) {
          const element = elements[i] as HTMLInputElement;
          data[element.name] = element.value;
        }
      
        fetch(`/api/foruns/update/${forumID}/`, {
          method: 'PUT',
          body: JSON.stringify(data),
          headers: { 'Content-Type': 'application/json' },
        })
          .then(response => {
            if (response.ok) {
              (document.getElementById('mensagem') as HTMLDivElement).innerHTML = 'Sucesso';
            } else {
              (document.getElementById('mensagem') as HTMLDivElement).innerHTML = 'Erro: ' + response.status + ' ' + response.statusText;
            }
          })
          .catch(erro => {
            console.log('Deu erro: ' + erro);
          });
      }
    });
  };
  