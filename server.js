const express = require("express");    //importando a biblioteca express  *require() node importa modulos

const app = express();    //criando o servidor
const PORT = 3000;         //numero da porta

app.use(express.json());  //solitações retornam em formato json
let voluntarios = [];   // array vazio onde sera guardado os "voluntários", em projetos reais usar banco de dados


// rota para cadastrar voluntario
app.post("/voluntarios", (req, res) => {
  const { nome, email, telefone, mensagem, especialidade } = req.body;

  //  Nome com no mínimo 3 caracteres
  if (!nome || nome.length < 3) {
    return res
      .status(400)
      .json({ erro: "Nome deve ter no mínimo 3 caracteres." });
  }

  // Email válido (simples)
  if (!email || !email.includes("@")) {
    return res.status(400).json({ erro: "E-mail inválido." });
  }

  // Telefone com 10 ou 11 números
  const telCampo = telefone.replace(/\D/g, "");
  if (telCampo.length < 10 || telCampo.length > 11) {
    return res
      .status(400)
      .json({ erro: "Telefone deve ter 10 ou 11 números." });
  }

  // Mensagem com no máximo 500 caracteres
  if (mensagem && mensagem.length > 500) {
    return res
      .status(400)
      .json({ erro: "Mensagem muito longa (máx 500 caracteres)." });
  }

  const novoVoluntario = {
    id: voluntarios.length + 1,   //numero em ordem crescente
    nome,
    email,
    telefone: telCampo,
    mensagem,
    especialidade,
  };
  voluntarios.push(novoVoluntario);  //adiciona cada voluntario dentro do array 

  return res.status(201).json(novoVoluntario); //status de que foi criado com sucesso
});

//rota para listar os voluntarios
app.get("/voluntarios", (req, res) => {
  res.status(200).json(voluntarios);
});
//servidor escuta a porta 3000 e função dentro é executada
app.listen(PORT, () => {
  console.log(`Servidor rodandp na porta http://localhost:${PORT}`);
});
