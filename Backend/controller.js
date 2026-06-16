// 2° passo: criar o controller, onde ficam as regras de negócio,
// ou seja, o que cada rota deve fazer
import { database } from "./database.js";
import { RestauranteRepository } from "./repository.js";

const restauranteRep = new RestauranteRepository(database);

// GET /listar — listar todas as comidas disponíveis
export async function listarComidas(request, response) {
    const resultDB = await restauranteRep.getComidas();

    if (resultDB.erro) {
        return response.status(500).json({ erro: resultDB.erro });
    }

    response.status(200).json(resultDB);
}

// POST /registrar — criar uma nova conta de cliente
export async function registrar(request, response) {
    const { nome, email, senha } = request.body;

    if (!nome || !email || !senha) {
        return response.status(400).json({
            erro: "Os campos nome, email e senha são obrigatórios"
        });
    }

    if (senha.length < 4) {
        return response.status(400).json({
            erro: "A senha deve ter pelo menos 4 caracteres"
        });
    }

    const resultDB = await restauranteRep.criarUsuario(nome, email, senha);

    if (resultDB.erro) {
        return response.status(400).json({ erro: resultDB.erro });
    }

    response.status(201).json({
        mensagem: "Conta criada com sucesso!",
        usuario: resultDB
    });
}

// POST /login — autenticar cliente
export async function login(request, response) {
    const { email, senha } = request.body;

    if (!email || !senha) {
        return response.status(400).json({
            erro: "Os campos email e senha são obrigatórios"
        });
    }

    const resultDB = await restauranteRep.login(email, senha);

    if (resultDB.erro) {
        return response.status(401).json({ erro: resultDB.erro });
    }

    response.status(200).json({
        mensagem: "Login realizado com sucesso!",
        usuario: resultDB
    });
}

// POST /comprar — registrar uma compra
export async function comprar(request, response) {
    const { comida_id, quantidade, cliente_nome, forma_pagamento, usuario_id } = request.body;

    // Validações
    if (!comida_id || !quantidade || !cliente_nome) {
        return response.status(400).json({
            erro: "Os campos comida_id, quantidade e cliente_nome são obrigatórios"
        });
    }

    if (quantidade < 1) {
        return response.status(400).json({
            erro: "A quantidade deve ser maior que zero"
        });
    }

    const resultDB = await restauranteRep.criarCompra(comida_id, quantidade, cliente_nome, forma_pagamento, usuario_id);

    if (resultDB.erro) {
        return response.status(500).json({ erro: resultDB.erro });
    }

    response.status(201).json({
        mensagem: "Pedido realizado com sucesso!",
        compra: resultDB
    });
}

// GET /compras — listar histórico geral de compras
export async function listarCompras(request, response) {
    const resultDB = await restauranteRep.getCompras();

    if (resultDB.erro) {
        return response.status(500).json({ erro: resultDB.erro });
    }

    response.status(200).json(resultDB);
}

// GET /minhas-compras/:usuario_id — listar pedidos de um usuário logado
export async function listarMinhasCompras(request, response) {
    const { usuario_id } = request.params;

    const resultDB = await restauranteRep.getComprasByUsuario(usuario_id);

    if (resultDB.erro) {
        return response.status(500).json({ erro: resultDB.erro });
    }

    response.status(200).json(resultDB);
}