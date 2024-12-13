const form = document.querySelector("#form-produto");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const nome = form.nome.value.trim();
  const forme = form.forme.value.trim();
  const email = form.email.value.trim();
  const produto = form.produto.value.trim();

  const nomeRegex = /^[a-zA-ZÀ-ÿ\s]{2,}$/;
  const formeRegex = /^[a-zA-ZÀ-ÿ\s]{2,}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const produtoRegex = /^([\w\s]{2,})(,\s*[\w\s]{2,})*$/;

  if (!nomeRegex.test(nome)) {
    alert("Por favor, insira um nome válido.");
    return; 
  }

  if (!formeRegex.test(forme)) {
    alert("Por favor, insira um fornecedor válido.");
    return; 
  }

  if (!emailRegex.test(email)) {
    alert("Por favor, insira um e-mail válido.");
    return;
  }

  if (!produtoRegex.test(produto)) {
    alert("Por favor, insira os produtos no formato correto (separados por vírgulas).");
    return; 
  }

  const fornecedor = {
    nome,
    email,
    forme,
    produto,
  };

  const resultado = await fetch(
    "https://aula-html-48736-default-rtdb.firebaseio.com/fornecedor.json",
    {
      method: "POST",
      body: JSON.stringify(fornecedor),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (resultado.ok) {
    form.reset();
    alert("Fornecedor cadastrado com sucesso!");
  } else {
    alert("Erro ao cadastrar fornecedor. Tente novamente.");
  }
});
