// 1° criar o servidor
import express from "express";
import cors from "cors";
import {
    listarComidas,
    comprar,
    listarCompras,
    listarMinhasCompras,
    registrar,
    login
} from "./controller.js";

const server = express();
const PORT = 8080;

server.use(cors());
server.use(express.json());

// Listar todas as comidas disponíveis
server.get("/listar", listarComidas);

// Autenticação
server.post("/registrar", registrar);
server.post("/login", login);

// Registrar uma compra
server.post("/comprar", comprar);

// Listar histórico geral de compras
server.get("/compras", listarCompras);

// Listar pedidos de um usuário logado
server.get("/minhas-compras/:usuario_id", listarMinhasCompras);

server.listen(PORT, () => console.log("SERVER ON"));