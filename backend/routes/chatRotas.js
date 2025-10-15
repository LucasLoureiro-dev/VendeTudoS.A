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

  io.on("connection", (socket) => {

    socket.on("usuario", (user) => {
      console.log("Novo usuario: ", user.nome, ", com id: ", socket.id)
      socket.emit("usuario", { nome: user.nome, senha: user.senha, socketId: socket.id })
    })

    socket.on("disconnect", () => {
      console.log("Usuário desconectado:", socket.id);
    });
  });
}

export default startChat;