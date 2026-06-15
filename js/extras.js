/* ============================================================
   MINHA BATERIA SOCIAL — extras.js
   Funcionalidades adicionais: tema, gráfico, confete,
   personalização, filtros, limpar histórico, badges
   ============================================================ */

/* ============================================================
   1. TEMA CLARO / ESCURO
   ============================================================ */
(function initTema() {
    const btnTema = document.getElementById("btn-tema");
    const html = document.documentElement;

    function aplicarTema(tema) {
        if (tema === "claro") {
            html.classList.add("tema-claro");
            btnTema.innerHTML = '<i class="bi bi-sun-fill"></i>';
        } else {
            html.classList.remove("tema-claro");
            btnTema.innerHTML = '<i class="bi bi-moon-stars-fill"></i>';
        }
    }

    const temaSalvo = localStorage.getItem("bateria_social_tema") || "escuro";
    aplicarTema(temaSalvo);

    btnTema.addEventListener("click", () => {
        const temaAtual = html.classList.contains("tema-claro") ? "claro" : "escuro";
        const novoTema = temaAtual === "claro" ? "escuro" : "claro";
        aplicarTema(novoTema);
        localStorage.setItem("bateria_social_tema", novoTema);
    });
})();

/* ============================================================
   2. CONFETE AO ATINGIR "NO TOPO"
   ============================================================ */
var _ultimoIndiceConfete = -1;

function aoRegistrar(indice, data) {
    // confete apenas uma vez por seleção do índice 6
    if (indice === 6 && indice !== _ultimoIndiceConfete) {
        dispararConfete();
    }
    _ultimoIndiceConfete = indice;

    // atualizar média diária para gráfico semanal
    atualizarMediaDiaria(indice, data);

    // atualizar badges
    atualizarBadges();

    // atualizar gráfico
    atualizarGrafico();
}

function dispararConfete() {
    if (typeof confetti !== "function") return;
    confetti({
        particleCount: 150,
        spread: 80,
        origin: { x: 0.5, y: 0.1 },
        colors: ["#ff4d4d", "#ffd966", "#6fdc6f", "#6fd0ff", "#a855f7", "#ff7aa2", "#fff"]
    });
}

// Monitorar mudança de índice para confete (via drag/click sem registrar)
(function monitorarConfete() {
    const raio = document.getElementById("raio");
    // usamos um MutationObserver para detectar mudanças no estilo do raio
    // Mas a forma mais simples: patch no atualizar já está no inline script
    // Aqui monitoramos o índice global para confete "on select" sem registrar
    // O confete dispara somente ao REGISTRAR (via aoRegistrar), não no arrasto
})();

/* ============================================================
   3. GRÁFICO SEMANAL
   ============================================================ */
var _graficoInstance = null;

function atualizarMediaDiaria(indice, data) {
    // indice 0-6, data no formato DD/MM/YYYY
    const chave = "bateria_social_semanal";
    const semanal = JSON.parse(localStorage.getItem(chave) || "{}");

    // calcular nova média baseada em todos os registros desse dia
    const registros = carregarHistorico().filter(r => r.data === data);
    if (registros.length === 0) return;

    const soma = registros.reduce((acc, r) => {
        const idx = estados.indexOf(r.estado);
        return acc + (idx >= 0 ? idx : 0);
    }, 0);
    semanal[data] = parseFloat((soma / registros.length).toFixed(2));
    localStorage.setItem(chave, JSON.stringify(semanal));
}

function obterDadosSemanal() {
    const semanal = JSON.parse(localStorage.getItem("bateria_social_semanal") || "{}");
    // pegar os últimos 7 dias
    const dias = [];
    const valores = [];
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const label = d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
        const chave = d.toLocaleDateString("pt-BR");
        dias.push(label);
        valores.push(semanal[chave] !== undefined ? semanal[chave] : null);
    }
    return { dias, valores };
}

function atualizarGrafico() {
    const { dias, valores } = obterDadosSemanal();
    const canvas = document.getElementById("grafico-semanal");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // gradiente
    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
    gradient.addColorStop(0, "rgba(111,208,255,0.45)");
    gradient.addColorStop(1, "rgba(111,208,255,0)");

    if (_graficoInstance) {
        _graficoInstance.data.labels = dias;
        _graficoInstance.data.datasets[0].data = valores;
        _graficoInstance.update();
        return;
    }

    _graficoInstance = new Chart(ctx, {
        type: "line",
        data: {
            labels: dias,
            datasets: [{
                label: "Média do dia",
                data: valores,
                borderColor: "#6fd0ff",
                borderWidth: 2.5,
                pointBackgroundColor: "#6fd0ff",
                pointRadius: 4,
                pointHoverRadius: 6,
                fill: true,
                backgroundColor: gradient,
                tension: 0.4,
                spanGaps: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: "rgba(20,30,50,0.85)",
                    titleColor: "#6fd0ff",
                    bodyColor: "#fff",
                    borderColor: "rgba(111,208,255,0.3)",
                    borderWidth: 1,
                    callbacks: {
                        label: (ctx) => {
                            const nomes = ["Muito esgotado","Esgotado","Baixo","Neutro","Bem","Animado","No topo"];
                            const v = ctx.parsed.y;
                            if (v === null) return "Sem dados";
                            const idx = Math.round(v);
                            return `${v.toFixed(1)} — ${nomes[Math.min(idx,6)] || ""}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: { color: "rgba(255,255,255,0.07)" },
                    ticks: { color: "rgba(255,255,255,0.5)", font: { size: 11 } }
                },
                y: {
                    min: 0, max: 6,
                    grid: { color: "rgba(255,255,255,0.07)" },
                    ticks: {
                        color: "rgba(255,255,255,0.5)",
                        font: { size: 11 },
                        stepSize: 1,
                        callback: (v) => ["😞","🙁","😕","😐","🙂","😊","😁"][v] || ""
                    }
                }
            }
        }
    });
}

// Toggle do gráfico
(function initGrafico() {
    const btnToggle = document.getElementById("btn-toggle-grafico");
    const wrapper = document.getElementById("grafico-wrapper");
    let aberto = true;

    btnToggle.addEventListener("click", () => {
        aberto = !aberto;
        wrapper.classList.toggle("fechado", !aberto);
        btnToggle.innerHTML = aberto
            ? '<i class="bi bi-chevron-up"></i>'
            : '<i class="bi bi-chevron-down"></i>';
    });

    // Inicializar gráfico ao carregar
    window.addEventListener("load", () => {
        atualizarGrafico();
    });
})();

/* ============================================================
   4. BADGES — contador de estados de hoje
   ============================================================ */
function atualizarBadges() {
    const hoje = new Date().toLocaleDateString("pt-BR");
    const registros = carregarHistorico().filter(r => r.data === hoje);
    const contagem = new Array(estados.length).fill(0);
    registros.forEach(r => {
        const idx = estados.indexOf(r.estado);
        if (idx >= 0) contagem[idx]++;
    });
    for (let i = 0; i < estados.length; i++) {
        const badge = document.getElementById("badge-" + i);
        if (badge) {
            badge.textContent = contagem[i];
            badge.style.display = contagem[i] > 0 ? "inline-flex" : "none";
        }
    }
}

/* ============================================================
   5. FILTRAR HISTÓRICO
   ============================================================ */
(function initFiltros() {
    const filtroTodos = document.getElementById("filtro-todos");
    const filtroEstadoSel = document.getElementById("filtro-estado");
    const filtroDataInput = document.getElementById("filtro-data");

    // popular select de estados
    function popularFiltroEstados() {
        filtroEstadoSel.innerHTML = '<option value="">Filtrar por estado…</option>';
        estados.forEach(e => {
            const opt = document.createElement("option");
            opt.value = e;
            opt.textContent = e;
            filtroEstadoSel.appendChild(opt);
        });
    }
    popularFiltroEstados();
    window.popularFiltroEstados = popularFiltroEstados;

    function aplicarFiltros() {
        const estado = filtroEstadoSel.value;
        const data = filtroDataInput.value;
        renderizarHistorico(estado || null, data || null);
    }

    filtroTodos.addEventListener("click", () => {
        filtroEstadoSel.value = "";
        filtroDataInput.value = "";
        filtroTodos.classList.add("ativo");
        renderizarHistorico();
    });

    filtroEstadoSel.addEventListener("change", () => {
        filtroTodos.classList.remove("ativo");
        aplicarFiltros();
    });

    filtroDataInput.addEventListener("change", () => {
        filtroTodos.classList.remove("ativo");
        aplicarFiltros();
    });
})();

/* ============================================================
   6. LIMPAR HISTÓRICO
   ============================================================ */
(function initLimparHistorico() {
    const btnLimpar = document.getElementById("btn-limpar-historico");
    const modalLimpar = document.getElementById("modal-limpar");
    const limparSim = document.getElementById("limpar-sim");
    const limparNao = document.getElementById("limpar-nao");

    btnLimpar.addEventListener("click", () => {
        modalLimpar.classList.add("aberto");
    });

    limparSim.addEventListener("click", () => {
        localStorage.removeItem("bateria_social_historico_v2");
        renderizarHistorico();
        atualizarBadges();
        atualizarGrafico();
        modalLimpar.classList.remove("aberto");
    });

    limparNao.addEventListener("click", () => {
        modalLimpar.classList.remove("aberto");
    });

    modalLimpar.addEventListener("click", (e) => {
        if (e.target === modalLimpar) modalLimpar.classList.remove("aberto");
    });
})();

/* ============================================================
   7. PERSONALIZAR ESTADOS E MENSAGENS
   ============================================================ */
(function initPersonalizar() {
    const btnPersonalizar = document.getElementById("btn-personalizar");
    const modalPersonalizar = document.getElementById("modal-personalizar");
    const btnCancelar = document.getElementById("personalizar-cancelar");
    const btnSalvar = document.getElementById("personalizar-salvar");
    const listaEstados = document.getElementById("lista-personalizar-estados");
    const listaMensagens = document.getElementById("lista-personalizar-mensagens");

    // tabs
    document.querySelectorAll(".tab-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("ativo"));
            document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("ativo"));
            btn.classList.add("ativo");
            document.getElementById("tab-" + btn.dataset.tab).classList.add("ativo");
        });
    });

    function abrirModal() {
        // popular campos de estados
        listaEstados.innerHTML = "";
        estados.forEach((e, i) => {
            // separar emoji e nome
            const partes = e.split(" ");
            const emoji = partes[partes.length - 1];
            const nome = partes.slice(0, -1).join(" ");
            const row = document.createElement("div");
            row.className = "personalizar-row";
            row.innerHTML = `
                <input type="text" class="personalizar-emoji" data-i="${i}" value="${emoji}" maxlength="4" title="Emoji">
                <input type="text" class="personalizar-nome" data-i="${i}" value="${nome}" placeholder="Nome do estado">
            `;
            listaEstados.appendChild(row);
        });

        // popular campos de mensagens
        listaMensagens.innerHTML = "";
        mensagens.forEach((m, i) => {
            const row = document.createElement("div");
            row.className = "personalizar-row";
            row.innerHTML = `
                <label class="personalizar-label">${estados[i]}</label>
                <input type="text" class="personalizar-msg" data-i="${i}" value="${m}" placeholder="Mensagem motivacional">
            `;
            listaMensagens.appendChild(row);
        });

        modalPersonalizar.classList.add("aberto");
    }

    function salvar() {
        // coletar estados
        const novosEstados = [];
        listaEstados.querySelectorAll(".personalizar-emoji").forEach((emojiEl, i) => {
            const emoji = emojiEl.value.trim() || estados[i].split(" ").pop();
            const nomeEl = listaEstados.querySelectorAll(".personalizar-nome")[i];
            const nome = nomeEl.value.trim() || estados[i].split(" ").slice(0,-1).join(" ");
            novosEstados.push(`${nome} ${emoji}`);
        });

        // coletar mensagens
        const novasMensagens = [];
        listaMensagens.querySelectorAll(".personalizar-msg").forEach((el, i) => {
            novasMensagens.push(el.value.trim() || mensagens[i]);
        });

        // salvar no localStorage
        localStorage.setItem("bateria_social_estados", JSON.stringify(novosEstados));
        localStorage.setItem("bateria_social_mensagens", JSON.stringify(novasMensagens));

        // atualizar arrays globais
        novosEstados.forEach((e, i) => { estados[i] = e; });
        novasMensagens.forEach((m, i) => { mensagens[i] = m; });

        // atualizar UI
        atualizarLegenda();
        atualizarSelectModal();
        if (typeof popularFiltroEstados === "function") popularFiltroEstados();
        renderizarHistorico();
        atualizarBadges();

        modalPersonalizar.classList.remove("aberto");
    }

    function atualizarLegenda() {
        const legendaContainer = document.getElementById("legenda-container");
        const items = legendaContainer.querySelectorAll(".legenda-item");
        estados.forEach((e, i) => {
            const partes = e.split(" ");
            const emoji = partes[partes.length - 1];
            const nome = partes.slice(0, -1).join(" ");
            if (items[i]) {
                const spanEmoji = items[i].querySelector("span:first-child");
                const spanNome = items[i].querySelector(".legenda-nome");
                if (spanEmoji) spanEmoji.textContent = emoji;
                if (spanNome) spanNome.textContent = nome;
            }
        });
        // também atualiza emojis na barra
        const segmentos = document.querySelectorAll(".segmento");
        estados.forEach((e, i) => {
            const emoji = e.split(" ").pop();
            if (segmentos[i]) segmentos[i].textContent = emoji;
        });
    }

    function atualizarSelectModal() {
        const modalSelect = document.getElementById("modal-select");
        if (!modalSelect) return;
        modalSelect.innerHTML = "";
        estados.forEach((e, i) => {
            const opt = document.createElement("option");
            opt.value = i;
            opt.textContent = e;
            modalSelect.appendChild(opt);
        });
    }

    btnPersonalizar.addEventListener("click", abrirModal);
    btnCancelar.addEventListener("click", () => modalPersonalizar.classList.remove("aberto"));
    btnSalvar.addEventListener("click", salvar);
    modalPersonalizar.addEventListener("click", (e) => {
        if (e.target === modalPersonalizar) modalPersonalizar.classList.remove("aberto");
    });
})();

/* ============================================================
   8. INICIALIZAÇÃO — carregar badges ao iniciar
   ============================================================ */
window.addEventListener("load", () => {
    atualizarBadges();
});
