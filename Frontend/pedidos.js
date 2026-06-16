// [] -> pedidos da sessão atual
let todosPedidos = []
let pedidosFiltrados = []

// ── CARREGAR PEDIDOS ───────────────────────────────────────
async function carregarPedidos() {
    let lista = document.getElementById("pedidosLista")
    lista.innerHTML = `<div class="pedidosLoading">Carregando pedidos...</div>`

    let usuario = JSON.parse(localStorage.getItem("usuario") || "null")

    // ── Usuário logado: busca histórico persistente pelo backend ──
    if (usuario) {
        try {
            let response = await fetch(`http://localhost:8080/minhas-compras/${usuario.id}`)
            let data = await response.json()
            todosPedidos = data
        } catch {
            todosPedidos = []
        }

        pedidosFiltrados = [...todosPedidos]
        atualizarResumo(pedidosFiltrados)
        renderPedidos(pedidosFiltrados)
        document.getElementById("buscaPedido").value = usuario.nome
        return
    }

    // ── Sem login: usa o último pedido salvo na sessão ──
    let clienteNome  = sessionStorage.getItem("clienteNome") || ""
    let ultimoPedido = sessionStorage.getItem("ultimoPedido")

    if (ultimoPedido) {
        todosPedidos = JSON.parse(ultimoPedido)
    } else {
        try {
            let response = await fetch("http://localhost:8080/compras")
            let data = await response.json()

            todosPedidos = clienteNome
                ? data.filter(p => p.cliente_nome.toLowerCase() === clienteNome.toLowerCase())
                : []
        } catch {
            todosPedidos = []
        }
    }

    pedidosFiltrados = [...todosPedidos]
    atualizarResumo(pedidosFiltrados)
    renderPedidos(pedidosFiltrados)

    if (clienteNome) {
        document.getElementById("buscaPedido").value = clienteNome
    }
}

// ── ATUALIZAR — limpa a sessão e zera a lista ──────────────
function limparPedidos() {
    let usuario = JSON.parse(localStorage.getItem("usuario") || "null")

    // Usuário logado: histórico é persistente, apenas recarrega
    if (usuario) {
        carregarPedidos()
        return
    }

    sessionStorage.removeItem("ultimoPedido")
    sessionStorage.removeItem("clienteNome")
    todosPedidos = []
    pedidosFiltrados = []
    document.getElementById("buscaPedido").value = ""
    document.getElementById("filtroPagamento").value = ""
    atualizarResumo([])
    renderPedidos([])
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
    window.location.href = "index.html"
}

// ── FILTRAR ────────────────────────────────────────────────
function filtrarPedidos() {
    let busca     = document.getElementById("buscaPedido").value.toLowerCase()
    let pagamento = document.getElementById("filtroPagamento").value

    pedidosFiltrados = todosPedidos.filter(p => {
        let bateNome   = p.cliente_nome.toLowerCase().includes(busca)
        let bateComida = p.comida_nome.toLowerCase().includes(busca)
        let batePag    = !pagamento || p.forma_pagamento === pagamento
        return (bateNome || bateComida) && batePag
    })

    atualizarResumo(pedidosFiltrados)
    renderPedidos(pedidosFiltrados)
}

// ── RESUMO ─────────────────────────────────────────────────
function atualizarResumo(lista) {
    let totalFaturado = lista.reduce((acc, p) => acc + Number(p.total), 0)
    let totalItens    = lista.reduce((acc, p) => acc + Number(p.quantidade), 0)
    let clientes      = new Set(lista.map(p => p.cliente_nome)).size

    document.getElementById("totalPedidos").textContent  = lista.length
    document.getElementById("totalFaturado").textContent = "R$ " + totalFaturado.toFixed(2).replace(".", ",")
    document.getElementById("totalItens").textContent    = totalItens
    document.getElementById("totalClientes").textContent = clientes
}

// ── RENDERIZAR PEDIDOS ─────────────────────────────────────
function renderPedidos(lista) {
    let container = document.getElementById("pedidosLista")
    container.innerHTML = ""

    if (!lista.length) {
        container.innerHTML = `
            <div class="pedidosVazio">
                <div class="pedidosVazioIcone">🧾</div>
                <h3>Nenhum pedido encontrado</h3>
                <p>Finalize um pedido no cardápio para ver aqui</p>
            </div>`
        return
    }

    // Agrupa por cliente
    let grupos = {}
    for (let p of lista) {
        if (!grupos[p.cliente_nome]) grupos[p.cliente_nome] = []
        grupos[p.cliente_nome].push(p)
    }

    for (let cliente in grupos) {
        let pedidosCliente = grupos[cliente]
        let totalCliente   = pedidosCliente.reduce((acc, p) => acc + Number(p.total), 0)
        let pagamento      = pedidosCliente[0].forma_pagamento || "—"
        let data           = new Date(pedidosCliente[0].criado_em).toLocaleString("pt-BR")

        let card = document.createElement("div")
        card.classList.add("pedidoCard")

        let iconePag = { "Pix": "💳", "Dinheiro": "💵", "Cartão Credito": "💳", "Cartão Debito": "💳" }[pagamento] || "💰"

        let itensHTML = pedidosCliente.map(p => `
            <div class="pedidoItem">
                <span class="pedidoItemNome">${p.comida_nome}</span>
                <span class="pedidoItemQtd">${p.quantidade}x</span>
                <span class="pedidoItemPreco">R$ ${Number(p.total).toFixed(2).replace(".", ",")}</span>
            </div>
        `).join("")

        card.innerHTML = `
            <div class="pedidoCardTopo">
                <div class="pedidoClienteInfo">
                    <div class="pedidoAvatar">${cliente.charAt(0).toUpperCase()}</div>
                    <div>
                        <div class="pedidoClienteNome">${cliente}</div>
                        <div class="pedidoData">${data}</div>
                    </div>
                </div>
                <div class="pedidoCardDireita">
                    <span class="statusBadge">pendente</span>
                    <span class="pedidoPagamento">${iconePag} ${pagamento}</span>
                </div>
            </div>
            <div class="pedidoItens">${itensHTML}</div>
            <div class="pedidoCardRodape">
                <span class="pedidoTotalLabel">Total do pedido</span>
                <span class="pedidoTotalValor">R$ ${totalCliente.toFixed(2).replace(".", ",")}</span>
            </div>
        `

        container.appendChild(card)
    }
}

// ── INIT ───────────────────────────────────────────────────
renderHeaderUsuario()
carregarPedidos()
