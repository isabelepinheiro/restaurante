// ── ALTERNAR ABAS ──────────────────────────────────────────
function mostrarAba(aba) {
    let abaEntrar  = document.getElementById("abaEntrar")
    let abaCriar   = document.getElementById("abaCriar")
    let formEntrar = document.getElementById("formEntrar")
    let formCriar  = document.getElementById("formCriar")

    if (aba === "entrar") {
        abaEntrar.classList.add("ativa")
        abaCriar.classList.remove("ativa")
        formEntrar.style.display = "block"
        formCriar.style.display  = "none"
    } else {
        abaCriar.classList.add("ativa")
        abaEntrar.classList.remove("ativa")
        formCriar.style.display  = "block"
        formEntrar.style.display = "none"
    }
}

// ── LOGIN ──────────────────────────────────────────────────
async function fazerLogin() {
    let email = document.getElementById("loginEmail").value.trim()
    let senha = document.getElementById("loginSenha").value

    if (!email || !senha) {
        mostrarMsg("msgLogin", "Preencha e-mail e senha!", "erro")
        return
    }

    try {
        let response = await fetch("http://localhost:8080/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, senha })
        })

        let data = await response.json()

        if (!response.ok) {
            mostrarMsg("msgLogin", data.erro || "Erro ao entrar", "erro")
            return
        }

        // Salva o usuário logado
        localStorage.setItem("usuario", JSON.stringify(data.usuario))

        mostrarMsg("msgLogin", `✅ Bem-vindo, ${data.usuario.nome}! Redirecionando...`, "sucesso")

        setTimeout(() => {
            window.location.href = "index.html"
        }, 1000)

    } catch {
        mostrarMsg("msgLogin", "Backend offline — não foi possível entrar.", "erro")
    }
}

// ── CRIAR CONTA ────────────────────────────────────────────
async function criarConta() {
    let nome  = document.getElementById("criarNome").value.trim()
    let email = document.getElementById("criarEmail").value.trim()
    let senha = document.getElementById("criarSenha").value

    if (!nome || !email || !senha) {
        mostrarMsg("msgCriar", "Preencha todos os campos!", "erro")
        return
    }

    if (senha.length < 4) {
        mostrarMsg("msgCriar", "A senha deve ter pelo menos 4 caracteres", "erro")
        return
    }

    try {
        let response = await fetch("http://localhost:8080/registrar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome, email, senha })
        })

        let data = await response.json()

        if (!response.ok) {
            mostrarMsg("msgCriar", data.erro || "Erro ao criar conta", "erro")
            return
        }

        mostrarMsg("msgCriar", "✅ Conta criada! Agora faça login.", "sucesso")

        setTimeout(() => {
            mostrarAba("entrar")
            document.getElementById("loginEmail").value = email
        }, 1200)

    } catch {
        mostrarMsg("msgCriar", "Backend offline — não foi possível criar a conta.", "erro")
    }
}

// ── HELPER ─────────────────────────────────────────────────
function mostrarMsg(containerId, texto, tipo) {
    let container = document.getElementById(containerId)
    container.innerHTML = ""
    let msg = document.createElement("p")
    msg.textContent = texto
    msg.classList.add(tipo === "sucesso" ? "msgSucesso" : "msgErro")
    container.appendChild(msg)
}

// ── SE JÁ ESTIVER LOGADO, REDIRECIONA ──────────────────────
if (localStorage.getItem("usuario")) {
    window.location.href = "index.html"
}