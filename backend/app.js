import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import { createServer } from "http";
import usuario from "./routes/usuarioRotas.js";
import chat from "./routes/chatRotas.js";
import startChat from "./routes/chatRotas.js";

// 1. Carrega variáveis de ambiente PRIMEIRO
dotenv.config();

// 2. Configuração básica do Express
const app = express();
const server = createServer(app);

startChat(server);

const porta = process.env.PORT || 8080;

app.use("/usuarios", usuario);
app.use("/chat", chat);

server
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
