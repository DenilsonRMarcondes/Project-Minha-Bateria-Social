# ⚡ Minha Bateria Social

Um projeto web interativo e visualmente intuitivo desenvolvido para medir e demonstrar o nível da sua "bateria social" no momento. Através de uma interface amigável baseada em emojis e uma paleta de cores indicativa, o usuário pode arrastar um controle deslizante (slider) para comunicar como está sua disposição para interações sociais.

## 🚀 Funcionalidades

* **Slider Interativo:** Arraste o ícone de raio (⚡) livremente pela barra para ajustar o seu nível atual de energia social.
* **Feedback Visual e Tooltip:** Um balão flutuante (tooltip) acompanha de forma suave o movimento do slider, exibindo de imediato o status atual em formato de texto e emoji.
* **Paleta de Cores e Emojis:** A barra é dividida em segmentos de cores (do vermelho de esgotamento ao azul de muita animação) que refletem com exatidão o estado de humor.
* **Suporte Multiplataforma:** O sistema de arraste foi programado para funcionar perfeitamente com cliques de mouse em computadores (`mousedown`, `mousemove`, `mouseup`) e toques em telas de smartphones/tablets (`touchstart`, `touchmove`, `touchend`).
* **Design Responsivo e Moderno:** Layout centralizado, utilizando cantos arredondados, sombras dinâmicas e classes utilitárias do Bootstrap 5.

## 🛠️ Tecnologias Utilizadas

* **HTML5:** Estruturação semântica do componente.
* **CSS3:** Estilização personalizada, animações de transição suaves, controle de flexbox e posicionamento do balão flutuante.
* **JavaScript (Vanilla):** Toda a lógica de cálculo de posicionamento do slider, mapeamento matemático dos estados baseados na largura do componente e gerenciamento de eventos do usuário.
* **Bootstrap 5.3.3:** Framework CSS utilizado principalmente em classes utilitárias de contêiner e tipografia (ex: `d-flex`, `bg-dark`, `rounded-4`, `shadow-lg`) para acelerar e padronizar o layout.

## 📊 Estados da Bateria Social

O medidor está programado para refletir 7 níveis diferentes de energia:

1. **Muito esgotado** 😞 (Vermelho - `#ff4d4d`)
2. **Esgotado** 🙁 (Vermelho - `#ff4d4d`)
3. **Baixo** 😕 (Rosa - `#ff7aa2`)
4. **Neutro** 😐 (Amarelo - `#ffd966`)
5. **Bem** 🙂 (Verde - `#6fdc6f`)
6. **Animado** 😊 (Azul - `#6fd0ff`)
7. **No topo** 😁 (Azul - `#6fd0ff`)

## ⚙️ Como Executar o Projeto

Como se trata de uma aplicação client-side simples (Front-end), você não precisa de um ambiente complexo para visualizar.

**Opção 1: Uso Direto (Mais simples)**
1. Baixe os arquivos do projeto.
2. Abra o arquivo `index.html` em qualquer navegador web moderno (Chrome, Edge, Firefox, Safari).

## 💡 Estrutura do Código

```text
Project-Minha-Bateria-Social/
├── index.html       # Arquivo único contendo Estrutura (HTML), Estilos (CSS) e Lógica (JS)
└── README.md        # Documentação do projeto (este arquivo)
```

## 🎨 Customização e Expansão

Se desejar alterar os textos, emojis ou adicionar mais passos de bateria, basta modificar o array `estados` dentro das tags `<script>` no final do `index.html`. Não se esqueça de adicionar a respectiva `<div class="segmento">` e a configuração de cor no CSS!

---
*Feito com ⚡ para comunicar de forma divertida quando precisamos daquela pausa social!*