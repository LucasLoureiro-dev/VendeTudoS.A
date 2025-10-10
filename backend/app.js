import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";

// 1. Carrega variáveis de ambiente PRIMEIRO
dotenv.config();

// 2. Configuração básica do Express
const app = express();
const porta = process.env.PORT || 8080;

// 7. Inicialização do servidor com verificação
const server = app
  .listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`);
  })
  .on("error", (err) => {
    console.error("Erro ao iniciar:", err);
  });

// 8. Encerramento elegante
process.on("SIGTERM", () => {
  server.close(() => {
    console.log("Servidor encerrado");
  });
});

