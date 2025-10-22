import { Server } from "socket.io";
import express, { json } from "express";
import {
  listar_chatController,
  criar_chatController,
} from "../controllers/chatControler.js";

export function startChat(server) {
  const io = new Server(server, {
    path: "/chat",
    cors: {
      origin: "*",
    },
  });

  
  let usuarios = {};

  io.on("connection", (socket) => {
    console.log("Novo usuário conectado:", socket.id);

    // Quando o usuário se identifica
    socket.on("usuario", (nome) => {
      usuarios[nome] = socket.id;
      console.log(`${nome} registrado com ID ${socket.id}`);
      io.emit("listaUsuarios", Object.keys(usuarios)); // Atualiza lista para todos
    });

    // Recebe mensagem privada
    socket.on("mensagemPrivada", ({ de, para, conteudo, horario }) => {
      const idDestino = usuarios[para];
      if (idDestino) {
        io.to(idDestino).emit("mensagemPrivada", { de, conteudo, horario });
        console.log(`${de} → ${para}: ${conteudo} horario: ${horario}`);
      }
    });

    // Quando o usuário desconecta
    socket.on("disconnect", () => {
      // Remove da lista
      for (let nome in usuarios) {
        if (usuarios[nome] === socket.id) {
          console.log(`${nome} saiu`);
          delete usuarios[nome];
          break;
        }
      }
      io.emit("listaUsuarios", Object.keys(usuarios)); // Atualiza lista
    });
  });
}

export default startChat;
