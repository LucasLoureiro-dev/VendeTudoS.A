"use client";

import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:8080", { path: "/chat" });
export default function ChatDashboard() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [currentChat, setCurrentChat] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [typing, setTyping] = useState(false);
  const [chatStatus, setChatStatus] = useState("online");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket.on("mensagem", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("usuario", (user) => {
      console.log(user);

      if (user.nome && user.senha) {
        console.log("olaaaaaaa");
        setUsuario(user);
        setIsLogged(true);
      } else {
        console.log("não deu");
      }
    });

    return () => socket.disconnect();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const enviaMensagem = () => {
    if (newMessage.trim() !== "") {
      socket.emit("mensagem", { usuario: users });
    }

    setNewMessage("");
  };

  const enviaUsuario = () => {
    // if (usuario.trim() !== "" && senha.trim() !== "") {
    socket.emit("usuario", { nome: usuario, senha: senha });
    // } else {
    // return alert("escreva seu nome e sua senha");
    // }
    setUsuario("");
  };

  const statusColors = {
    online: "bg-green-500",
    offline: "bg-gray-400",
    ocupado: "bg-red-500",
    ausente: "bg-yellow-400",
  };

  if (isLogged) {
    return (
      <>
        <div className="container flex-1">
          <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-blue-700">
                  Painel de Chat
                </h2>
                <p className="text-sm text-gray-500">{""}</p>
              </div>

              <div className="flex-1 overflow-y-auto">
                <h3 className="px-4 pt-3 font-semibold text-gray-600">
                  Usuários
                </h3>
                {/* {users.map((u) => (
                <div
                  key={u.id}
                  onClick={() => setActiveChat(u)}
                  className={`flex items-center px-4 py-3 cursor-pointer hover:bg-blue-50 ${
                    activeChat.id === u.id ? "bg-blue-100" : ""
                  }`}
                >
                  <div
                    className={`w-3 h-3 rounded-full mr-2 ${
                      statusColors[u.status]
                    }`}
                  ></div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {u.name}
                    </p>
                    <p className="text-xs text-gray-500">{u.role}</p>
                  </div>
                </div>
              ))} */}
              </div>
            </aside>

            {/* Chat Main */}
            <main className="flex-1 flex flex-col">
              <header className="flex justify-between items-center bg-white border-b px-6 py-3 shadow-sm">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full`}></div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {/* {activeChat.name} */}
                  </h2>
                  <span className="text-sm text-gray-500">
                    {/* ({activeChat.status}) */}
                  </span>
                </div>
              </header>

              {/* Mensagens */}
              <div className="flex-1 overflow-y-auto p-6 space-y-3">
                {messages.map((msg, i) => {
                  console.log(msg);
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <form className="flex items-center bg-white border-t border-gray-200 px-4 py-3">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <button
                  type="button"
                  onSubmit={enviaMensagem}
                  className="ml-3 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700"
                >
                  Enviar
                </button>
              </form>
            </main>

            {/* Painel lateral direito */}
            <aside className="w-72 bg-white border-l border-gray-200 p-4 flex flex-col">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-gray-300 mb-2"></div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {/* {activeChat.name} */}
                </h3>
                {/* <p className="text-sm text-gray-500">{activeChat.role}</p> */}
                {/* <span
                className={`mt-1 text-xs px-3 py-1 rounded-full text-white ${
                  activeChat.status === "online"
                    ? "bg-green-500"
                    : activeChat.status === "ocupado"
                    ? "bg-red-500"
                    : activeChat.status === "ausente"
                    ? "bg-yellow-500"
                    : "bg-gray-400"
                }`}
              >
                {activeChat.status}
              </span> */}
              </div>

              <div className="mt-6 text-sm text-gray-600">
                <h4 className="font-semibold mb-2">Informações</h4>
                <p>Último login: 10/10/2025</p>
                <p>Email: exemplo@empresa.com</p>
                <p>Departamento: Química</p>
              </div>
            </aside>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <h3>Login</h3>
        <form action="">
          <input
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            placeholder="Nome"
          />
          <br />
          <br />
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Senha"
          />
          <br />
          <br />
          <button type="button" onClick={enviaUsuario}>
            Enviar
          </button>
        </form>
      </>
    );
  }
}
