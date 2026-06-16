// [] -> itens do carrinho { comida, quantidade }
let todasComidas = []
let carrinho = []

// ── DADOS MOCKADOS ─────────────────────────────────────────
const COMIDAS_MOCK = [
    { id: 1,  nome: "Carne de Sol",       descricao: "Carne bovina curada no sal, frita na manteiga de garrafa com macaxeira cozida",      preco: 42.00, categoria: "Comidas Nordestinas", img: "img/carne-de-sol.jpg" },
    { id: 2,  nome: "Baião de Dois",      descricao: "Arroz com feijão verde, queijo coalho, manteiga de garrafa e torresmo",              preco: 32.00, categoria: "Comidas Nordestinas", img: "img/baiao-de-dois.jpg" },
    { id: 3,  nome: "Buchada de Bode",    descricao: "Vísceras de bode temperadas com ervas e cozidas dentro do bucho do animal",         preco: 38.00, categoria: "Comidas Nordestinas", img: "img/buchada-de-bode.jpg" },
    { id: 4,  nome: "Tapioca",            descricao: "Tapioca crocante recheada com queijo coalho e manteiga de garrafa",                 preco: 14.00, categoria: "Comidas Nordestinas", img: "img/tapioca.jpg" },
    { id: 5,  nome: "Cuscuz Nordestino",  descricao: "Cuscuz de milho flocado com manteiga, queijo e ovo caipira mexido",                preco: 18.00, categoria: "Comidas Nordestinas", img: "img/cuscuz-nordestino.jpg" },
    { id: 6,  nome: "Sarapatel",          descricao: "Miúdos de porco ou bode cozidos com temperos nordestinos e sangue",                preco: 36.00, categoria: "Comidas Nordestinas", img: "img/sarapatel.jpg" },
    { id: 7,  nome: "Macaxeira Frita",    descricao: "Macaxeira cozida e frita na manteiga de garrafa, dourada e crocante por fora",     preco: 16.00, categoria: "Comidas Nordestinas", img: "img/macaxeira-frita.jpg" },
    { id: 8,  nome: "Feijão Verde",       descricao: "Feijão verde cozido com carne de charque, maxixe e jerimum",                      preco: 28.00, categoria: "Comidas Nordestinas", img: "img/feijao-verde.jpg" },
    { id: 9,  nome: "Canjica",            descricao: "Milho branco cozido no leite de coco com amendoim, canela e cravo",               preco: 12.00, categoria: "Comidas de São João", img: "img/canjica.jpg" },
    { id: 10, nome: "Pamonha",            descricao: "Massa de milho verde cremosa, cozida em palha de milho, doce ou salgada",         preco: 10.00, categoria: "Comidas de São João", img: "img/pamonha.jpg" },
    { id: 11, nome: "Milho Cozido",       descricao: "Espiga de milho verde cozida com sal e manteiga, fresquinha e macia",             preco:  8.00, categoria: "Comidas de São João", img: "img/milho-cozido.jpg" },
    { id: 12, nome: "Pé de Moleque",      descricao: "Amendoim torrado caramelizado com rapadura, crocante e irresistível",             preco:  9.00, categoria: "Comidas de São João", img: "img/pe-de-moleque.jpg" },
    { id: 13, nome: "Bolo de Milho",      descricao: "Bolo cremoso de milho verde com coco ralado, fofinho e aromático",               preco: 11.00, categoria: "Comidas de São João", img: "img/bolo-de-milho.jpg" },
    { id: 14, nome: "Quentão",            descricao: "Bebida quente de cachaça com gengibre, cravo, canela e frutas cítricas",         preco: 13.00, categoria: "Comidas de São João", img: "img/quentao.jpg" },
    { id: 15, nome: "Cartola",            descricao: "Banana frita com queijo coalho derretido, açúcar e canela por cima",             preco: 14.00, categoria: "Comidas de São João", img: "img/cartola.png" },
    { id: 16, nome: "Cocada",             descricao: "Doce cremoso de coco ralado com leite condensado e açúcar, tradicional de festa", preco:  8.00, categoria: "Comidas de São João", img: "img/cocada.jpg" },
    { id: 17, nome: "Suco de Cajá",       descricao: "Suco natural de cajá, azedinho e refrescante, típico do Nordeste",               preco:  8.00, categoria: "Bebidas", img: "img/suco-de-caja.jpg" },
    { id: 18, nome: "Suco de Umbu",       descricao: "Suco cremoso de umbu, fruta nativa do sertão nordestino",                        preco:  8.00, categoria: "Bebidas", img: "img/suco-umbu.jpg" },
    { id: 19, nome: "Suco de Tamarindo",  descricao: "Suco de tamarindo gelado, agridoce e muito refrescante",                        preco:  7.00, categoria: "Bebidas", img: "img/suco-de-tamarindo.jpg" },
    { id: 20, nome: "Limonada Nordestina",descricao: "Limão, leite condensado, água de coco e hortelã batidos com gelo",              preco:  9.00, categoria: "Bebidas", img: "img/suco-limonada.jpg" },
    { id: 21, nome: "Caldo de Cana",      descricao: "Caldo de cana fresco espremido na hora, gelado e naturalmente doce",            preco:  6.00, categoria: "Bebidas", img: "img/caldo-de-cana.png" },
    { id: 22, nome: "Água de Coco",       descricao: "Água de coco natural, fresquinha direto do coco verde",                         preco:  7.00, categoria: "Bebidas", img: "img/agua-coco.jpg" },
    { id: 23, nome: "Batida de Maracujá", descricao: "Maracujá, leite condensado e cachaça batidos, cremosa e refrescante",           preco: 12.00, categoria: "Bebidas", img: "img/batida-maracuja.jpg" },
    { id: 24, nome: "Café com Rapadura",  descricao: "Café coado na hora adoçado com rapadura pura, do jeito nordestino",             preco:  5.00, categoria: "Bebidas", img: "img/cafe-rapadura.jpg" },
]

// ── LISTAR COMIDAS ─────────────────────────────────────────
async function listarComidas() {
    try {
        let response = await fetch("http://localhost:8080/listar")
        let data = await response.json()
        todasComidas = data.map(c => ({
            ...c,
            img: COMIDAS_MOCK.find(m => m.id === c.id)?.img || null
        }))
    } catch {
        todasComidas = COMIDAS_MOCK
    }

    preencherFiltros()
    renderComidas(todasComidas)
}

// ── FILTROS ────────────────────────────────────────────────
function preencherFiltros() {
    let select = document.getElementById("selectCategoria")
    let cats = ["Comidas Nordestinas", "Comidas de São João", "Bebidas"]
    cats.forEach(cat => {
        let opt = document.createElement("option")
        opt.value = cat
        opt.textContent = cat
        select.appendChild(opt)
    })
}

function filtrarComidas() {
    let busca     = document.getElementById("busca").value.toLowerCase()
    let categoria = document.getElementById("selectCategoria").value
    let ordem     = document.getElementById("selectOrdem").value

    let lista = todasComidas.filter(c => {
        let bateNome = c.nome.toLowerCase().includes(busca)
        let bateDesc = c.descricao.toLowerCase().includes(busca)
        let bateCat  = !categoria || c.categoria === categoria
        return (bateNome || bateDesc) && bateCat
    })

    if (ordem === "preco_asc")  lista.sort((a, b) => a.preco - b.preco)
    if (ordem === "preco_desc") lista.sort((a, b) => b.preco - a.preco)
    if (ordem === "nome")       lista.sort((a, b) => a.nome.localeCompare(b.nome))

    renderComidas(lista)
}

// ── RENDERIZAR CARDÁPIO ────────────────────────────────────
function renderComidas(lista) {
    let container = document.getElementById("listaComidas")
    container.innerHTML = ""

    if (!lista.length) {
        container.innerHTML = `<p class="semSelecao">Nenhuma comida encontrada.</p>`
        return
    }

    let ordemCats = ["Comidas Nordestinas", "Comidas de São João", "Bebidas"]
    let grupos = {}
    for (let comida of lista) {
        if (!grupos[comida.categoria]) grupos[comida.categoria] = []
        grupos[comida.categoria].push(comida)
    }

    for (let cat of ordemCats) {
        if (!grupos[cat]) continue

        let secao = document.createElement("div")
        secao.classList.add("categoriaSecao")

        let header = document.createElement("div")
        header.classList.add("categoriaHeader", "aberta")
        header.innerHTML = `${cat} <span class="seta">▲</span>`
        header.onclick = () => toggleCategoria(header, grid)

        let grid = document.createElement("div")
        grid.classList.add("categoriaGrid")

        for (let comida of grupos[cat]) {
            let card = document.createElement("div")
            card.classList.add("cardComida")

            let noCarrinho = carrinho.find(i => i.comida.id === comida.id)
            if (noCarrinho) card.classList.add("noCarrinho")

            let fotoHTML = comida.img
                ? `<img class="cardFoto" src="${comida.img}" alt="${comida.nome}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
                : ""
            let emojiHTML = `<div class="cardFotoEmoji" style="${comida.img ? 'display:none' : ''}">🍽️</div>`

            card.innerHTML = `
                ${fotoHTML}
                ${emojiHTML}
                <div class="cardBody">
                    <div class="cardNomeComida">${comida.nome}</div>
                    <div class="cardDescComida">${comida.descricao}</div>
                    <div class="cardPrecoComida">R$ ${Number(comida.preco).toFixed(2).replace(".", ",")}</div>
                    <button class="btnAddCarrinho ${noCarrinho ? 'adicionado' : ''}"
                        onclick="adicionarAoCarrinho(${comida.id}, this)">
                        ${noCarrinho ? "✓ Adicionado" : "+ Adicionar"}
                    </button>
                </div>
            `
            grid.appendChild(card)
        }

        secao.appendChild(header)
        secao.appendChild(grid)
        container.appendChild(secao)
    }
}

// ── COLAPSAR CATEGORIA ─────────────────────────────────────
function toggleCategoria(header, grid) {
    let aberta = header.classList.contains("aberta")
    if (aberta) {
        grid.style.display = "none"
        header.classList.remove("aberta")
    } else {
        grid.style.display = "flex"
        header.classList.add("aberta")
    }
}

// ── CARRINHO ───────────────────────────────────────────────
function adicionarAoCarrinho(id, btn) {
    let comida = todasComidas.find(c => c.id === id)
    let itemExistente = carrinho.find(i => i.comida.id === id)

    if (itemExistente) {
        itemExistente.quantidade++
    } else {
        carrinho.push({ comida, quantidade: 1 })
        btn.closest(".cardComida").classList.add("noCarrinho")
        btn.textContent = "✓ Adicionado"
        btn.classList.add("adicionado")
    }

    renderCarrinho()
}

function renderCarrinho() {
    let container  = document.getElementById("carrinhoItens")
    let vazio      = document.getElementById("carrinhoVazio")
    let totalLinha = document.getElementById("totalLinha")

    container.innerHTML = ""

    if (!carrinho.length) {
        vazio.style.display = "block"
        totalLinha.style.display = "none"
        return
    }

    vazio.style.display = "none"
    totalLinha.style.display = "flex"

    let totalGeral = 0

    for (let item of carrinho) {
        let subtotal = item.comida.preco * item.quantidade
        totalGeral += subtotal

        let div = document.createElement("div")
        div.classList.add("carrinhoItem")

        let miniatura = item.comida.img
            ? `<img src="${item.comida.img}" alt="${item.comida.nome}" class="carrinhoFoto" onerror="this.style.display='none'">`
            : `<span class="carrinhoEmoji">🍽️</span>`

        div.innerHTML = `
            <div class="carrinhoLinhaTopo">
                ${miniatura}
                <div class="carrinhoTexto">
                    <div class="carrinhoNome">${item.comida.nome}</div>
                    <div class="carrinhoPrecoUnit">R$ ${Number(item.comida.preco).toFixed(2).replace(".", ",")} cada</div>
                </div>
                <button class="btnRemover" onclick="removerDoCarrinho(${item.comida.id})">🗑</button>
            </div>
            <div class="carrinhoLinhaBaixo">
                <div class="carrinhoControle">
                    <button onclick="mudarQtdCarrinho(${item.comida.id}, -1)">−</button>
                    <span>${item.quantidade}</span>
                    <button onclick="mudarQtdCarrinho(${item.comida.id}, 1)">+</button>
                </div>
                <div class="carrinhoSubtotal">R$ ${subtotal.toFixed(2).replace(".", ",")}</div>
            </div>
        `

        container.appendChild(div)
    }

    document.getElementById("totalPedido").textContent = "R$ " + totalGeral.toFixed(2).replace(".", ",")
}

function mudarQtdCarrinho(id, delta) {
    let item = carrinho.find(i => i.comida.id === id)
    if (!item) return
    item.quantidade += delta
    if (item.quantidade < 1) {
        removerDoCarrinho(id)
        return
    }
    renderCarrinho()
}

function removerDoCarrinho(id) {
    carrinho = carrinho.filter(i => i.comida.id !== id)
    renderComidas(todasComidas)
    renderCarrinho()
}

// ── REALIZAR PEDIDO ────────────────────────────────────────
async function realizarPedido() {
    let clienteNome    = document.getElementById("clienteNome").value.trim()
    let formaPagamento = document.getElementById("formaPagamento").value

    if (!clienteNome) {
        mostrarMensagem("Por favor, informe seu nome!", "erro")
        return
    }

    if (!carrinho.length) {
        mostrarMensagem("Adicione pelo menos uma comida ao carrinho!", "erro")
        return
    }

    if (!formaPagamento) {
        mostrarMensagem("Selecione uma forma de pagamento!", "erro")
        return
    }

    // Verifica se há usuário logado
    let usuario = JSON.parse(localStorage.getItem("usuario") || "null")

    // Monta os itens do pedido para salvar na sessão
    let itensPedido = carrinho.map(item => ({
        comida_id:    item.comida.id,
        comida_nome:  item.comida.nome,
        quantidade:   item.quantidade,
        total:        item.comida.preco * item.quantidade,
        cliente_nome: clienteNome,
        forma_pagamento: formaPagamento,
        status:       "pendente",
        criado_em:    new Date().toISOString()
    }))

    try {
        // Tenta enviar para o backend
        for (let item of carrinho) {
            let response = await fetch("http://localhost:8080/comprar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    comida_id:       item.comida.id,
                    quantidade:      item.quantidade,
                    cliente_nome:    clienteNome,
                    forma_pagamento: formaPagamento,
                    usuario_id:      usuario ? usuario.id : null
                })
            })

            if (!response.ok) {
                let data = await response.json()
                mostrarMensagem("Erro: " + data.erro, "erro")
                return
            }
        }
    } catch {
        // Backend offline: continua com dados locais
    }

    // Salva na sessionStorage para a página de pedidos ler
    sessionStorage.setItem("clienteNome", clienteNome)
    sessionStorage.setItem("ultimoPedido", JSON.stringify(itensPedido))

    mostrarMensagem(`✅ Pedido confirmado! Redirecionando...`, "sucesso")

    // Aguarda 1s e redireciona para a página de pedidos
    setTimeout(() => {
        window.location.href = "pedidos.html"
    }, 1000)
}

// ── HELPERS ────────────────────────────────────────────────
function mostrarMensagem(texto, tipo) {
    let container = document.getElementById("msgContainer")
    container.innerHTML = ""
    let msg = document.createElement("p")
    msg.textContent = texto
    msg.classList.add(tipo === "sucesso" ? "msgSucesso" : "msgErro")
    container.appendChild(msg)
    setTimeout(() => container.innerHTML = "", 5000)
}

function limparFormulario() {
    document.getElementById("clienteNome").value = ""
    document.getElementById("formaPagamento").value = ""
    carrinho = []
    renderCarrinho()
    renderComidas(todasComidas)
}

// ── MODO FESTA JUNINA ──────────────────────────────────────
function toggleFesta() {
    let body         = document.body
    let bandeirinhas = document.getElementById("bandeirinhas")
    let btn          = document.querySelector(".btnFesta")

    let ativo = body.classList.toggle("festaJunina")

    bandeirinhas.style.display = ativo ? "block" : "none"
    btn.textContent            = ativo ? "✖" : "🎉"
    btn.title                  = ativo ? "Desativar modo festa" : "Modo Festa Junina"
}

// ── HEADER: USUÁRIO LOGADO ─────────────────────────────────
function renderHeaderUsuario() {
    let container = document.getElementById("headerUsuario")
    if (!container) return

    let usuario = JSON.parse(localStorage.getItem("usuario") || "null")

    if (usuario) {
        container.innerHTML = `
            <span class="headerUsuarioNome">👤 ${usuario.nome}</span>
            <button class="btnSair" onclick="sair()">Sair</button>
        `
    } else {
        container.innerHTML = `<a href="login.html">Entrar</a>`
    }
}

function sair() {
    localStorage.removeItem("usuario")
    renderHeaderUsuario()
}

// ── INIT ───────────────────────────────────────────────────
renderHeaderUsuario()
listarComidas()

// Preenche o nome automaticamente se o usuário estiver logado
let usuarioLogado = JSON.parse(localStorage.getItem("usuario") || "null")
if (usuarioLogado) {
    document.getElementById("clienteNome").value = usuarioLogado.nome
}