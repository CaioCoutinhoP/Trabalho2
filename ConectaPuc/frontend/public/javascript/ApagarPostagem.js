function apagarPostagem(postId) {
    const backendAddress = 'http://127.0.0.1:8000/';

    // Confirmar com o usuário antes de excluir
    const confirmacao = confirm("Tem certeza que deseja excluir esta postagem?");
    
    if (confirmacao) {
        // Enviar uma solicitação ao servidor para excluir a postagem
        fetch(backendAddress + 'api/postagens/' + postId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                // Adicione cabeçalhos de autenticação, se necessário
            },
        })
        .then(response => {
            if (response.ok) {
                // Exclusão bem-sucedida
                alert('Postagem excluída com sucesso!');
                // Redirecionar ou realizar outras ações após a exclusão
                // Por exemplo, você pode recarregar a página para atualizar a lista de postagens
                location.reload();
            } else {
                // Lidar com erros ao excluir
                alert('Erro ao excluir a postagem. Tente novamente mais tarde.');
            }
        })
        .catch(error => {
            console.error('Erro ao excluir a postagem:', error);
            alert('Erro ao excluir a postagem. Tente novamente mais tarde.');
        });
    }
}
