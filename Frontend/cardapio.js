const COMIDAS_MOCK = [
    // Comidas Nordestinas
    { id: 1,  nome: "Carne de Sol",       descricao: "Carne bovina curada no sal, frita na manteiga de garrafa com macaxeira cozida",      preco: 42.00, categoria: "Comidas Nordestinas", img: "img/carne-de-sol.jpg" },
    { id: 2,  nome: "Baião de Dois",      descricao: "Arroz com feijão verde, queijo coalho, manteiga de garrafa e torresmo",              preco: 32.00, categoria: "Comidas Nordestinas", img: "img/baiao-de-dois.jpg" },
    { id: 3,  nome: "Buchada de Bode",    descricao: "Vísceras de bode temperadas com ervas e cozidas dentro do bucho do animal",         preco: 38.00, categoria: "Comidas Nordestinas", img: "img/buchada-de-bode.jpg" },
    { id: 4,  nome: "Tapioca",            descricao: "Tapioca crocante recheada com queijo coalho e manteiga de garrafa",                 preco: 14.00, categoria: "Comidas Nordestinas", img: "img/tapioca.jpg" },
    { id: 5,  nome: "Cuscuz Nordestino",  descricao: "Cuscuz de milho flocado com manteiga, queijo e ovo caipira mexido",                preco: 18.00, categoria: "Comidas Nordestinas", img: "img/cuscuz-nordestino.jpg" },
    { id: 6,  nome: "Sarapatel",          descricao: "Miúdos de porco ou bode cozidos com temperos nordestinos e sangue",                preco: 36.00, categoria: "Comidas Nordestinas", img: "img/sarapatel.jpg" },
    { id: 7,  nome: "Macaxeira Frita",    descricao: "Macaxeira cozida e frita na manteiga de garrafa, dourada e crocante por fora",     preco: 16.00, categoria: "Comidas Nordestinas", img: "img/macaxeira-frita.jpg" },
    { id: 8,  nome: "Feijão Verde",       descricao: "Feijão verde cozido com carne de charque, maxixe e jerimum",                      preco: 28.00, categoria: "Comidas Nordestinas", img: "img/feijao-verde.jpg" },

    // Comidas de São João
    { id: 9,  nome: "Canjica",            descricao: "Milho branco cozido no leite de coco com amendoim, canela e cravo",               preco: 12.00, categoria: "Comidas de São João", img: "img/canjica.jpg" },
    { id: 10, nome: "Pamonha",            descricao: "Massa de milho verde cremosa, cozida em palha de milho, doce ou salgada",         preco: 10.00, categoria: "Comidas de São João", img: "img/pamonha.jpg" },
    { id: 11, nome: "Milho Cozido",       descricao: "Espiga de milho verde cozida com sal e manteiga, fresquinha e macia",             preco:  8.00, categoria: "Comidas de São João", img: "img/milho-cozido.jpg" },
    { id: 12, nome: "Pé de Moleque",      descricao: "Amendoim torrado caramelizado com rapadura, crocante e irresistível",             preco:  9.00, categoria: "Comidas de São João", img: "img/pe-de-moleque.jpg" },
    { id: 13, nome: "Bolo de Milho",      descricao: "Bolo cremoso de milho verde com coco ralado, fofinho e aromático",               preco: 11.00, categoria: "Comidas de São João", img: "img/bolo-de-milho.jpg" },
    { id: 14, nome: "Quentão",            descricao: "Bebida quente de cachaça com gengibre, cravo, canela e frutas cítricas",         preco: 13.00, categoria: "Comidas de São João", img: "img/quentao.jpg" },
    { id: 15, nome: "Cartola",            descricao: "Banana frita com queijo coalho derretido, açúcar e canela por cima",             preco: 14.00, categoria: "Comidas de São João", img: "img/cartola.png" },
    { id: 16, nome: "Cocada",             descricao: "Doce cremoso de coco ralado com leite condensado e açúcar, tradicional de festa", preco:  8.00, categoria: "Comidas de São João", img: "img/cocada.jpg" },

    // Bebidas
    { id: 17, nome: "Suco de Cajá",        descricao: "Suco natural de cajá, azedinho e refrescante, típico do Nordeste",              preco:  8.00, categoria: "Bebidas", img: "img/suco-de-caja.jpg" },
    { id: 18, nome: "Suco de Umbu",        descricao: "Suco cremoso de umbu, fruta nativa do sertão nordestino",                       preco:  8.00, categoria: "Bebidas", img: "img/suco-umbu.jpg" },
    { id: 19, nome: "Suco de Tamarindo",   descricao: "Suco de tamarindo gelado, agridoce e muito refrescante",                       preco:  7.00, categoria: "Bebidas", img: "img/suco-de-tamarindo.jpg" },
    { id: 20, nome: "Limonada Nordestina", descricao: "Limão, leite condensado, água de coco e hortelã batidos com gelo",             preco:  9.00, categoria: "Bebidas", img: "img/suco-limonada.jpg" },
    { id: 21, nome: "Caldo de Cana",       descricao: "Caldo de cana fresco espremido na hora, gelado e naturalmente doce",           preco:  6.00, categoria: "Bebidas", img: "img/caldo-de-cana.png" },
    { id: 22, nome: "Água de Coco",        descricao: "Água de coco natural, fresquinha direto do coco verde",                        preco:  7.00, categoria: "Bebidas", img: "img/agua-coco.jpg" },
    { id: 23, nome: "Batida de Maracujá",  descricao: "Maracujá, leite condensado e cachaça batidos, cremosa e refrescante",          preco: 12.00, categoria: "Bebidas", img: "img/batida-maracuja.jpg" },
    { id: 24, nome: "Café com Rapadura",   descricao: "Café coado na hora adoçado com rapadura pura, do jeito nordestino",            preco:  5.00, categoria: "Bebidas", img: "img/cafe-rapadura.jpg" },
]

function renderCardapio() {
    const container = document.getElementById("listaCardapio")
    container.innerHTML = ""

    const categorias = [
        { nome: "Comidas Nordestinas"},
        { nome: "Comidas de São João" },
        { nome: "Bebidas" }
    ]

    categorias.forEach((cat, index) => {

        // Banner junino antes de São João
        if (cat.nome === "Comidas de São João") {
            const banner = document.createElement("div")
            banner.className = "bannerJunino"
            banner.innerHTML = `
                <h2> Especial São João!</h2>
                <p>Pratos típicos juninos feitos com tradição e muito sabor nordestino</p>
            `
            container.appendChild(banner)
        }

        // Título da categoria
        const titulo = document.createElement("h2")
        titulo.className = "tituloCategoria"
        titulo.textContent = ` ${cat.nome}`
        container.appendChild(titulo)

        // Grid de cards
        const grid = document.createElement("div")
        grid.className = "gridCardapio"

        COMIDAS_MOCK
            .filter(c => c.categoria === cat.nome)
            .forEach(comida => {
                const card = document.createElement("div")
                card.className = "cardPrato"

                card.innerHTML = `
                    <img
                        src="${comida.img}"
                        alt="${comida.nome}"
                        onerror="this.style.display='none'"
                    >
                    <div class="cardInfo">
                        <h3>${comida.nome}</h3>
                        <p>${comida.descricao}</p>
                        <div class="preco">R$ ${Number(comida.preco).toFixed(2).replace(".", ",")}</div>
                    </div>
                `

                grid.appendChild(card)
            })

        container.appendChild(grid)
    })
}

renderCardapio()