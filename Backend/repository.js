// 4° passo: criar o arquivo repository.js para criar a classe de repositório,
// onde ficam as regras de acesso ao banco de dados
import crypto from "crypto";

// Função simples de hash de senha usando SHA-256
function hashSenha(senha) {
    return crypto.createHash("sha256").update(senha).digest("hex");
}

export class RestauranteRepository {
    constructor(database) {
        this.database = database;
    }

    // ── COMIDAS ──────────────────────────────────────────

    // Listar todas as comidas disponíveis
    async getComidas() {
        try {
            const sql = "SELECT * FROM comidas ORDER BY id";
            const result = await this.database.query(sql);
            return result.rows;
        } catch (error) {
            return { erro: error.message };
        }
    }

    // Buscar comida pelo id
    async getComidaById(id) {
        try {
            const sql = "SELECT * FROM comidas WHERE id = $1";
            const result = await this.database.query(sql, [id]);
            return result.rows;
        } catch (error) {
            return { erro: error.message };
        }
    }

    // ── USUÁRIOS ─────────────────────────────────────────

    // Cadastrar novo usuário
    async criarUsuario(nome, email, senha) {
        try {
            const senhaHash = hashSenha(senha);

            const sql = `
                INSERT INTO usuarios (nome, email, senha)
                VALUES ($1, $2, $3)
                RETURNING id, nome, email, criado_em
            `;
            const result = await this.database.query(sql, [nome, email, senhaHash]);
            return result.rows[0];
        } catch (error) {
            // Email duplicado
            if (error.code === "23505") {
                return { erro: "Este e-mail já está cadastrado" };
            }
            return { erro: error.message };
        }
    }

    // Fazer login — verifica email e senha
    async login(email, senha) {
        try {
            const senhaHash = hashSenha(senha);

            const sql = `
                SELECT id, nome, email, criado_em
                FROM usuarios
                WHERE email = $1 AND senha = $2
            `;
            const result = await this.database.query(sql, [email, senhaHash]);

            if (!result.rows.length) {
                return { erro: "E-mail ou senha inválidos" };
            }

            return result.rows[0];
        } catch (error) {
            return { erro: error.message };
        }
    }

    // ── COMPRAS ──────────────────────────────────────────

    // Registrar uma compra
    async criarCompra(comida_id, quantidade, cliente_nome, forma_pagamento, usuario_id) {
        try {
            // Busca o preço da comida para calcular o total
            const comida = await this.getComidaById(comida_id);

            if (!comida.length) {
                return { erro: "Comida não encontrada" };
            }

            const total = comida[0].preco * quantidade;

            const sql = `
                INSERT INTO compras (comida_id, quantidade, total, cliente_nome, forma_pagamento, usuario_id)
                VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING *
            `;
            const result = await this.database.query(sql, [
                comida_id, quantidade, total, cliente_nome, forma_pagamento || null, usuario_id || null
            ]);
            return result.rows[0];
        } catch (error) {
            return { erro: error.message };
        }
    }

    // Listar todas as compras realizadas
    async getCompras() {
        try {
            const sql = `
                SELECT
                    compras.id,
                    compras.usuario_id,
                    compras.cliente_nome,
                    compras.quantidade,
                    compras.total,
                    compras.forma_pagamento,
                    compras.status,
                    compras.criado_em,
                    comidas.nome AS comida_nome,
                    comidas.preco AS comida_preco,
                    comidas.img
                FROM compras
                JOIN comidas ON compras.comida_id = comidas.id
                ORDER BY compras.criado_em DESC
            `;
            const result = await this.database.query(sql);
            return result.rows;
        } catch (error) {
            return { erro: error.message };
        }
    }

    // Listar compras de um usuário específico
    async getComprasByUsuario(usuario_id) {
        try {
            const sql = `
                SELECT
                    compras.id,
                    compras.usuario_id,
                    compras.cliente_nome,
                    compras.quantidade,
                    compras.total,
                    compras.forma_pagamento,
                    compras.status,
                    compras.criado_em,
                    comidas.nome AS comida_nome,
                    comidas.preco AS comida_preco,
                    comidas.img
                FROM compras
                JOIN comidas ON compras.comida_id = comidas.id
                WHERE compras.usuario_id = $1
                ORDER BY compras.criado_em DESC
            `;
            const result = await this.database.query(sql, [usuario_id]);
            return result.rows;
        } catch (error) {
            return { erro: error.message };
        }
    }
}