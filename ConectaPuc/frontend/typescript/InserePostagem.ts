onload = () => {
   document.addEventListener("DOMContentLoaded", () => {
        const insereButton = document.getElementById("insere") as HTMLButtonElement;
        insereButton.addEventListener("click", async (evento) => {
        evento.preventDefault();
    
        const elements = (document.getElementById("meuFormulario") as HTMLFormElement).elements;
        const data: Record<string, string> = {};
        for (let i = 0; i < elements.length; i++) {
            const element = elements[i] as HTMLInputElement | HTMLTextAreaElement;
            data[element.name] = element.value;
        }
    
        try {
            const response = await fetch(backendAddress + "carros/umcarro/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            });
    
            if (response.ok) {
            (document.getElementById('mensagem') as HTMLDivElement).innerHTML = 'Dados inseridos com sucesso';
            } else {
            (document.getElementById('mensagem') as HTMLDivElement).innerHTML = 'Dados inseridos com erro';
            }
        } catch (error) {
            console.log(error);
        }
        });
    });
}
    