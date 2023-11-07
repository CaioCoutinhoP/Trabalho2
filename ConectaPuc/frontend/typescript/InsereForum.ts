onload = () => {
    (document.getElementById('insere') as HTMLButtonElement).addEventListener('click', evento => {
        evento.preventDefault();

        const elements = (document.getElementById('meuFormulario') as HTMLFormElement).elements;
        let data: Record<string, string> = {};
        for (let i = 0; i < elements.length; i++) {
            const element = elements[i] as HTMLInputElement;
            data[element.name] = element.value;
        }

        fetch(backendAddress + "api/forums/create/", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            if (response.ok) {
                (document.getElementById('mensagem') as HTMLDivElement).innerHTML = 'Fórum criado com sucesso';
            } else {
                (document.getElementById('mensagem') as HTMLDivElement).innerHTML = 'Erro ao criar o fórum';
            }
        })
        .catch(error => { console.log(error) });
    });
}
