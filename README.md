# 🍽️ Sabor Nordestino — Sistema de Pedidos

Sistema web  de pedidos para restaurante nordestino, com cardápio interativo, carrinho de compras, forma de pagamento e página de pedidos realizados. Teste de atualização

---

## 📁 Estrutura do Projeto

```
restaurante/
├─ backend/
│  ├─ index.js       → Servidor Express (porta 8080)
│  ├─ controller.js   → Regras de negócio das rotas
│  ├─ repository.js   → Acesso ao banco de dados
│  ├─ database.js     → Conexão com o PostgreSQL
│  ├─ create_tables.sql →  SQL para criar o banco
│  └─ package.json       → Dependências do projeto
│
└─frontend/
    ├─ index.html      → Página principal (cardápio + carrinho)
    ├─ cardapio.html   → Página completa do cardápio
    ├─ pedidos.html   → Página de pedidos realizados
    ├─ script.js      → Lógica da página principal
    ├─ pedidos.js      → Lógica da página de pedidos
    ├─ style.css       → Estilização completa
    └── img/           → Imagens das comidas e logo
        ├── logo.png
        ├── restaurante.jpg
        ├── carne-de-sol.jpg
        ├── baiao-de-dois.jpg
        └── ...
```

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) v18 ou superior
- [PostgreSQL](https://www.postgresql.org/) instalado e rodando

### 1. Configurar o Banco de Dados

Abra o **pgAdmin** ou o **psql** e execute:

```sql
CREATE DATABASE restaurante;
```

Depois, com o banco selecionado, execute o arquivo `create_tables.sql`:



Ou cole o conteúdo do arquivo no **Query Tool** do pgAdmin e clique em ▶ **Run**.

Isso vai criar as tabelas e inserir as **24 comidas** de exemplo automaticamente.

### 2. Instalar as Dependências

```bash
cd backend
npm install
```

### 3. Iniciar o Servidor

```bash
node index.js
```

O servidor vai rodar em `http://localhost:8080` e exibir a mensagem **SERVER ON** no terminal.

### 4. Abrir o Frontend

Abra o arquivo `frontend/index.html` diretamente no navegador.

> ⚠️ O frontend funciona mesmo sem o backend rodando, usando os dados mockados do `script.js`.

---

## 📡 Endpoints da API

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/listar` | Lista todas as comidas disponíveis |
| `POST` | `/comprar` | Registra um novo pedido |
| `GET` | `/compras` | Lista todos os pedidos realizados |

### `GET /listar`
```json
[
  {
    "id": 1,
    "nome": "Carne de Sol",
    "descricao": "Carne bovina curada no sal...",
    "preco": "42.00",
    "categoria": "Comidas Nordestinas",
    "img": "img/carne-de-sol.jpg"
  }
]
```

### `POST /comprar`
**Body:**
```json
{
  "comida_id": 1,
  "quantidade": 2,
  "cliente_nome": "Maria Silva",
  "forma_pagamento": "Pix"
}
```
**Resposta:**
```json
{
  "sucesso": true,
  "mensagem": "Pedido realizado com sucesso!",
  "compra": { ... }
}
```

---

## 🗄️ Banco de Dados

### Tabela `comidas`
| Coluna | Tipo | Descrição |
|--------|------|-----------|
| `id` | SERIAL PK | Identificador único |
| `nome` | VARCHAR(100) | Nome da comida |
| `descricao` | TEXT | Descrição do prato |
| `preco` | NUMERIC(10,2) | Preço em R$ |
| `categoria` | VARCHAR(50) | Comidas Nordestinas / Comidas de São João / Bebidas |
| `img` | VARCHAR(200) | Caminho da imagem |

### Tabela `compras`
| Coluna | Tipo | Descrição |
|--------|------|-----------|
| `id` | SERIAL PK | Identificador único |
| `comida_id` | INTEGER FK | Referência à tabela comidas |
| `quantidade` | INTEGER | Quantidade pedida |
| `total` | NUMERIC(10,2) | Valor total (preço × quantidade) |
| `cliente_nome` | VARCHAR(100) | Nome do cliente |
| `status` | VARCHAR(30) | Status do pedido (padrão: pendente) |
| `criado_em` | TIMESTAMP | Data e hora do pedido |

---

## 🍽️ Cardápio

### Comidas Nordestinas
| # | Prato | Preço |
|---|-------|-------|
| 1 | Carne de Sol | R$ 42,00 |
| 2 | Baião de Dois | R$ 32,00 |
| 3 | Buchada de Bode | R$ 38,00 |
| 4 | Tapioca | R$ 14,00 |
| 5 | Cuscuz Nordestino | R$ 18,00 |
| 6 | Sarapatel | R$ 36,00 |
| 7 | Macaxeira Frita | R$ 16,00 |
| 8 | Feijão Verde | R$ 28,00 |

### Comidas de São João
| # | Prato | Preço |
|---|-------|-------|
| 9 | Canjica | R$ 12,00 |
| 10 | Pamonha | R$ 10,00 |
| 11 | Milho Cozido | R$ 8,00 |
| 12 | Pé de Moleque | R$ 9,00 |
| 13 | Bolo de Milho | R$ 11,00 |
| 14 | Quentão | R$ 13,00 |
| 15 | Cartola | R$ 14,00 |
| 16 | Cocada | R$ 8,00 |

### Bebidas
| # | Bebida | Preço |
|---|--------|-------|
| 17 | Suco de Cajá | R$ 8,00 |
| 18 | Suco de Umbu | R$ 8,00 |
| 19 | Suco de Tamarindo | R$ 7,00 |
| 20 | Limonada Nordestina | R$ 9,00 |
| 21 | Caldo de Cana | R$ 6,00 |
| 22 | Água de Coco | R$ 7,00 |
| 23 | Batida de Maracujá | R$ 12,00 |
| 24 | Café com Rapadura | R$ 5,00 |

---

## ✨ Funcionalidades

- **Cardápio interativo** com carrossel horizontal por categoria
- **Busca e filtros** por categoria e ordenação por preço/nome
- **Carrinho de compras** com controle de quantidade e remoção de itens
- **Forma de pagamento** — Pix, Dinheiro, Cartão de Crédito ou Débito
- **Página de pedidos** com resumo de total faturado, itens vendidos e clientes
- **Modo Festa Junina** 🎉 — botão flutuante que ativa bandeirinhas animadas e tema festivo
- **Funciona offline** — dados mockados quando o backend não está disponível
- **Responsivo** — adaptado para mobile, tablet e desktop

---

## 🛠️ Tecnologias Utilizadas

**Backend**
- Node.js
- Express.js
- PostgreSQL
- pg (node-postgres)
- CORS

**Frontend**
- HTML5
- CSS3 (sem frameworks)
- JavaScript puro (ES Modules)
- SessionStorage (para persistência de sessão sem login)

---

## 📞 Contato

**Sabor Nordestino**
- 📍 Av. Simão de Góis, 1525 — Centro, Jaguaruana/CE
- 📸 Instagram: @sabornordestino
- 👍 Facebook: Sabor Nordestino
- 💬 WhatsApp: (88) 93049-524
- ⏰ Seg–Sex: 11h–22h | Sáb–Dom: 10h–23h

---

*Feito com ❤️ no Ceará — 2026*
---

## Tabela do Banco de Dados
-- CREATE DATABASE restaurante;
### Criação da tabela:
- Tabela de comidas

-- Tabela de comidas
CREATE TABLE IF NOT EXISTS comidas (
    id         SERIAL PRIMARY KEY,
    nome       VARCHAR(100) NOT NULL,
    descricao  TEXT,
    preco      NUMERIC(10, 2) NOT NULL,
    categoria  VARCHAR(50)
   
);

-- Tabela de usuários (login do cliente)
CREATE TABLE IF NOT EXISTS usuarios (
    id       SERIAL PRIMARY KEY,
    nome     VARCHAR(100) NOT NULL,
    email    VARCHAR(150) UNIQUE NOT NULL,
    senha    VARCHAR(255) NOT NULL,
    criado_em TIMESTAMP DEFAULT NOW()
);

-- Tabela de compras
CREATE TABLE IF NOT EXISTS compras (
    id              SERIAL PRIMARY KEY,
    usuario_id      INTEGER REFERENCES usuarios(id),
    comida_id       INTEGER NOT NULL REFERENCES comidas(id),
    quantidade      INTEGER NOT NULL DEFAULT 1,
    total           NUMERIC(10, 2) NOT NULL,
    cliente_nome    VARCHAR(100) NOT NULL,
    forma_pagamento VARCHAR(30),
    status          VARCHAR(30) DEFAULT 'em preparo',
    criado_em       TIMESTAMP DEFAULT NOW()
);


-- Comidas Nordestinas
INSERT INTO comidas (nome, descricao, preco, categoria) VALUES
    ('Carne de Sol',      'Carne bovina curada no sal, frita na manteiga de garrafa com macaxeira cozida',      42.00, 'Comidas Nordestinas'),
    ('Baião de Dois',     'Arroz com feijão verde, queijo coalho, manteiga de garrafa e torresmo',              32.00, 'Comidas Nordestinas'),
    ('Buchada de Bode',   'Vísceras de bode temperadas com ervas e cozidas dentro do bucho do animal',         38.00, 'Comidas Nordestinas'),
    ('Tapioca',           'Tapioca crocante recheada com queijo coalho e manteiga de garrafa',                  14.00, 'Comidas Nordestinas'),
    ('Cuscuz Nordestino', 'Cuscuz de milho flocado com manteiga, queijo e ovo caipira mexido',                 18.00, 'Comidas Nordestinas'),
    ('Sarapatel',         'Miúdos de porco ou bode cozidos com temperos nordestinos e sangue',                 36.00, 'Comidas Nordestinas'),
    ('Macaxeira Frita',   'Macaxeira cozida e frita na manteiga de garrafa, dourada e crocante por fora',      16.00, 'Comidas Nordestinas'),
    ('Feijão Verde',      'Feijão verde cozido com carne de charque, maxixe e jerimum',                        28.00, 'Comidas Nordestinas');

-- Comidas de São João
INSERT INTO comidas (nome, descricao, preco, categoria) VALUES
    ('Canjica',           'Milho branco cozido no leite de coco com amendoim, canela e cravo',                 12.00, 'Comidas de São João'),
    ('Pamonha',           'Massa de milho verde cremosa, cozida em palha de milho, doce ou salgada',           10.00, 'Comidas de São João'),
    ('Milho Cozido',      'Espiga de milho verde cozida com sal e manteiga, fresquinha e macia',                8.00, 'Comidas de São João'),
    ('Pé de Moleque',     'Amendoim torrado caramelizado com rapadura, crocante e irresistível',                9.00, 'Comidas de São João'),
    ('Bolo de Milho',     'Bolo cremoso de milho verde com coco ralado, fofinho e aromático',                  11.00, 'Comidas de São João'),
    ('Quentão',           'Bebida quente de cachaça com gengibre, cravo, canela e frutas cítricas',            13.00, 'Comidas de São João'),
    ('Cartola',           'Banana frita com queijo coalho derretido, açúcar e canela por cima',                14.00, 'Comidas de São João'),
    ('Cocada',            'Doce cremoso de coco ralado com leite condensado e açúcar, tradicional de festa',    8.00, 'Comidas de São João');

-- Bebidas
INSERT INTO comidas (nome, descricao, preco, categoria) VALUES
    ('Suco de Cajá',        'Suco natural de cajá, azedinho e refrescante, típico do Nordeste',              8.00, 'Bebidas'),
    ('Suco de Umbu',        'Suco cremoso de umbu, fruta nativa do sertão nordestino',                       8.00, 'Bebidas'),
    ('Suco de Tamarindo',   'Suco de tamarindo gelado, agridoce e muito refrescante',                        7.00, 'Bebidas'),
    ('Limonada Nordestina', 'Limão, leite condensado, água de coco e hortelã batidos com gelo',              9.00, 'Bebidas'),
    ('Caldo de Cana',       'Caldo de cana fresco espremido na hora, gelado e naturalmente doce',            6.00, 'Bebidas'),
    ('Água de Coco',        'Água de coco natural, fresquinha direto do coco verde',                         7.00, 'Bebidas'),
    ('Batida de Maracujá',  'Maracujá, leite condensado e cachaça batidos, cremosa e refrescante',          12.00, 'Bebidas'),
    ('Café com Rapadura',   'Café coado na hora adoçado com rapadura pura, do jeito nordestino',             5.00, 'Bebidas');