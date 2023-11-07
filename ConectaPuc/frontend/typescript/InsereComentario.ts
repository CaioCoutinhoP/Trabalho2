onload = () => {
    (document.getElementById('insere') as HTMLButtonElement).addEventListener('click', evento => {
      evento.preventDefault();
  
      const elements = (document.getElementById('meuFormulario') as HTMLFormElement).elements;
      let data: Record<string, string> = {};
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i] as HTMLInputElement;
        data[element.name] = element.value;
      }
  
      fetch(backendAddress + "api/comentarios/create/", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
      })
      .then(response => {
        if (response.ok) {
          (document.getElementById('mensagem') as HTMLDivElement).innerHTML = 'Comentário inserido com sucesso';
        } else {
          (document.getElementById('mensagem') as HTMLDivElement).innerHTML = 'Erro ao inserir o comentário';
        }
      })
      .catch(error => { console.log(error) });
    });
  }
  