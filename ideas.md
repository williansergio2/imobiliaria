# ImóvelPrime — Design Philosophy

## Três Abordagens Consideradas

### 1. Dark Luxury Estate (Probabilidade: 0.07)
Fundo quase preto com detalhes dourados e tipografia serif elegante. Inspirado em marcas de luxo como Sotheby's e Christie's Real Estate.

### 2. Charcoal & Gold Prestige (Probabilidade: 0.08) ← ESCOLHIDA
Grafite escuro como base, dourado como acento principal, vermelho apenas para CTAs críticos. Transmite autoridade, sofisticação e credibilidade sem ser ostentoso.

### 3. Monochrome Architect (Probabilidade: 0.04)
Preto, branco e cinza com linhas geométricas precisas. Muito minimalista, pode parecer frio para o público-alvo.

---

## Abordagem Escolhida: Charcoal & Gold Prestige

### Design Movement
**Dark Luxury Modernism** — Inspirado em marcas premium de alto padrão como Sotheby's International Realty e marcas de relógios suíços. Sofisticação através da contenção, não do excesso.

### Core Principles
1. **Contraste dramático**: fundos escuros com texto claro e acentos dourados criam hierarquia visual imediata
2. **Ouro como linguagem de valor**: o dourado é reservado para elementos que comunicam qualidade e destaque
3. **Espaço como luxo**: margens generosas e espaçamento amplo comunicam exclusividade
4. **Vermelho como urgência**: usado exclusivamente para ações críticas (WhatsApp, excluir, alertas)

### Color Philosophy
- **Background principal**: `#0F0F0F` a `#1A1A1A` — preto elegante, não puro
- **Superfícies de card**: `#1E1E1E` a `#252525` — grafite escuro
- **Dourado primário**: `#C9A84C` — ouro envelhecido, sofisticado
- **Dourado claro**: `#E8C96B` — para hover e glow
- **Vermelho ação**: `#C0392B` — apenas CTAs críticos e WhatsApp
- **Texto principal**: `#F5F0E8` — branco quente, não frio
- **Texto secundário**: `#9A9A8A` — cinza quente

### Layout Paradigm
Layout assimétrico com coluna de conteúdo deslocada à esquerda. Hero section com imagem ocupando 100vw com overlay gradiente. Cards de imóveis em grid responsivo com hover effects. Sidebar no painel admin.

### Signature Elements
1. **Linha dourada fina** (1px) como separador e acento em cards e seções
2. **Faixa diagonal de status** sobre fotos dos imóveis com cores semânticas
3. **Glow dourado suave** em hover de botões e cards principais

### Interaction Philosophy
Micro-animações sutis que confirmam interações sem distrair. Hover revela informações adicionais progressivamente. Transições de 150-250ms com ease-out.

### Animation
- Entrada de seções: `opacity 0 → 1` + `translateY(20px → 0)` em 400ms
- Hover de cards: `scale(1.02)` + `box-shadow` dourado em 200ms
- Botões: `scale(0.97)` no `:active` em 160ms
- Header: transição para fundo sólido ao rolar (200ms)

### Typography System
- **Display/Títulos**: `Cormorant Garamond` — serif elegante, autoridade e luxo
- **Corpo/UI**: `DM Sans` — sans-serif moderna, legível, profissional
- **Código/Badges**: `DM Mono` — para códigos de imóveis (IMV-1001)
- Hierarquia: H1 48-64px, H2 32-40px, H3 24px, body 16px

### Brand Essence
**ImóvelPrime** — para quem busca o imóvel certo com quem entende do mercado. Sofisticado. Confiável. Eficiente.

### Brand Voice
- Headlines: diretas, confiantes, sem jargão. Ex: "Seu próximo lar começa aqui."
- CTAs: ação clara. Ex: "Ver imóveis disponíveis" em vez de "Clique aqui"
- Microcopy: preciso e humano. Ex: "Código copiado!" em vez de "Operação concluída."

### Wordmark & Logo
Símbolo geométrico combinando silhueta de casa com coroa — representa propriedade de alto valor. Dourado sobre fundo escuro.

### Signature Brand Color
**Dourado `#C9A84C`** — inconfundível, associado a valor, qualidade e prestígio.
