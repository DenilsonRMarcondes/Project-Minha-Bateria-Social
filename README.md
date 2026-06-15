# ⚡ Minha Bateria Social

Um projeto web interativo e visualmente intuitivo para medir e registrar o nível da sua "bateria social". Com interface estilo **Liquid Glass** inspirada na Apple, emojis flutuantes animados e diversas funcionalidades de acompanhamento de humor, o usuário pode arrastar um slider para comunicar sua disposição social — e acompanhar a evolução ao longo da semana.

## 🚀 Funcionalidades

* **Slider Interativo:** Arraste o ícone ⚡ pela barra para ajustar o nível de energia social. Suporta mouse, toque (mobile) e teclado (← →).
* **Barra de Estados com Efeito Glass:** Segmentos coloridos com reflexo de vidro (bolha Liquid Glass) que pulsam ao trocar de estado.
* **Balão Flutuante:** Exibe o estado atual enquanto o slider é arrastado.
* **Indicador de Bateria (Pilha):** Ícone estilo pilha que enche e esvazia conforme o nível, com cor e porcentagem dinâmicas.
* **Mensagens Motivacionais:** Frase personalizada para cada estado de energia.
* **Emojis Flutuantes no Fundo:** Partículas de emoji animadas com física de repulsão ao passar o mouse e drag & drop interativo.
* **Botão Registrar:** Salva o estado atual com data e hora no histórico persistente (localStorage).
* **Histórico Completo com CRUD:** Visualizar, editar e excluir registros individualmente, com modais Liquid Glass de confirmação.
* **Filtrar Histórico:** Filtre registros por estado ou por data.
* **Limpar Histórico:** Apaga todos os registros com confirmação via modal.
* **Gráfico Semanal:** Linha de evolução dos últimos 7 dias com média diária por estado (Chart.js).
* **Tema Claro / Escuro:** Alternância de tema salva no localStorage.
* **Confete ao atingir "No topo":** Efeito de confete ao registrar o estado máximo (canvas-confetti).
* **Badges de Contagem:** Contador de registros do dia por estado na legenda.
* **Personalizar Estados e Mensagens:** Modal para editar nome, emoji e mensagem motivacional de cada estado.
* **Animação de Entrada:** Card animado ao carregar a página.
* **Favicon SVG:** Ícone personalizado estilo bateria com efeito glass.
* **Responsivo:** Funciona em desktop e mobile.

## 🛠️ Tecnologias Utilizadas

* **HTML5 / CSS3 / JavaScript (Vanilla)**
* **Bootstrap 5.3.3** — layout, utilitários e grid
* **Bootstrap Icons 1.11.3** — ícones nos botões e histórico
* **Chart.js 4.4.3** — gráfico de linha semanal
* **canvas-confetti 1.9.3** — efeito de confete
* **localStorage** — persistência de histórico, tema, estados e mensagens personalizados
* **CSS Liquid Glass** — `backdrop-filter`, transparências, inset box-shadows e pseudo-elementos para reflexo de vidro
* **Canvas API** — emojis flutuantes com física e interação de mouse

## 📊 Estados da Bateria Social

O medidor reflete 7 níveis de energia (personalizáveis):

| # | Estado | Emoji | Cor |
|---|--------|-------|-----|
| 1 | Muito esgotado | 😞 | Vermelho `#ff4d4d` |
| 2 | Esgotado | 🙁 | Rosa `#ff7aa2` |
| 3 | Baixo | 😕 | Amarelo `#ffd966` |
| 4 | Neutro | 😐 | Amarelo `#ffd966` |
| 5 | Bem | 🙂 | Verde `#6fdc6f` |
| 6 | Animado | 😊 | Azul `#6fd0ff` |
| 7 | No topo | 😁 | Azul `#6fd0ff` |

## ⚙️ Como Executar o Projeto

**Opção 1: Abertura direta**
1. Abra o arquivo `index.html` diretamente em qualquer navegador moderno (Chrome, Edge, Firefox, Safari).

> Não requer servidor back-end nem instalação de dependências. Todas as bibliotecas são carregadas via CDN.

## 💡 Estrutura do Projeto

```text
Project-Minha-Bateria-Social/
├── index.html          # Estrutura HTML e lógica JS principal (inline)
├── favicon.svg         # Ícone do site (bateria estilo glass)
├── style/
│   └── style.css       # Todos os estilos (Liquid Glass, animações, temas)
├── js/
│   └── extras.js       # Funcionalidades extras: tema, gráfico, confete,
│                       # personalização, filtros, badges, limpar histórico
└── README.md           # Documentação do projeto (este arquivo)
```

## 🎨 Personalização

Acesse o botão **⚙️ Personalizar** dentro do app para editar nome, emoji e mensagem motivacional de cada estado diretamente pela interface. As alterações são salvas automaticamente no `localStorage`.

Para customizações avançadas no código, edite os arrays `estadosDefault` e `mensagensDefault` em `index.html`, ou os estilos em `style/style.css`.

---
*Feito com ⚡ para comunicar de forma divertida quando precisamos daquela pausa social!*
