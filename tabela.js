const form = document.querySelector("#form-produto");
const tabela = document.querySelector("#tabela-container");


const lerDados = async () => {
    const resultado = await fetch(
      "https://aula-html-48736-default-rtdb.firebaseio.com/fornecedor.json",
      {
        method: "GET",
      }
    );
    if (resultado.ok) {
      tabela.innerHTML = ""; // limpa o corpo da tabela
  
      // converter os dados de json para objeto js
      const dados = await resultado.json();
      for (let id in dados) {
        const tr = document.createElement("tr");
        const usuario = dados[id];
        tr.innerHTML = `
            <td class="centralizado">${usuario.nome}</td>
            <td class="centralizado">${usuario.email}</td>
            <td class="centralizado">${usuario.forme}</td>
            <td class="centralizado">${usuario.produto}</td>
            <td class="centralizado no-print">
                <button onclick="editar('${id}')">Editar</button>
                <button onclick="remover('${id}')">Excluir</button>
            </td>
        `;
        tabela.appendChild(tr);
      }
    }
  };


  const editar = async (id) => {
    const usuario = {};
    usuario.nome = prompt("Novo nome");
    usuario.email = prompt("Novo email");
    usuario.forme = prompt("Novo fornecedor");
    usuario.produto = prompt("Novo produto");
    const resultado = await fetch(`https://aula-html-48736-default-rtdb.firebaseio.com/fornecedor/${id}.json`, {
      method: 'PUT',
      body: JSON.stringify(usuario),
      headers: {
          "Content-Type": "application/json",
      }
    });
    if(resultado.ok){
      lerDados();
    }
  };

    const remover = async (id) => {
      const resultado = await fetch(`https://aula-html-48736-default-rtdb.firebaseio.com/fornecedor/${id}.json`, {
        method: "DELETE",
      });
      if(resultado.ok){
        lerDados();
      }
    };

  lerDados();
