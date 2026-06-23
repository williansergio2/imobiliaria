# ImóvelPrime — Site Imobiliário Premium

Site imobiliário completo com painel administrativo, desenvolvido com React + TypeScript + Tailwind CSS + Supabase.

---

## Tecnologias

| Camada | Tecnologia |
|---|---|
| Frontend | React 19 + TypeScript + Vite |
| Estilização | Tailwind CSS 4 |
| Autenticação | Supabase Auth (própria — independente da Manus) |
| Banco de Dados | Supabase (PostgreSQL) |
| Storage de Imagens | Supabase Storage |
| Deploy | Vercel |

---

## Estrutura de Páginas

### Site Público
| Rota | Descrição |
|---|---|
| `/` | Home com hero, imóveis em destaque, depoimentos |
| `/imoveis/comprar` | Listagem de imóveis à venda com filtros |
| `/imoveis/alugar` | Listagem de imóveis para alugar com filtros |
| `/imovel/:slug` | Detalhes do imóvel com galeria, mapa e WhatsApp |
| `/sobre` | Página institucional Sobre Nós |
| `/contato` | Página de contato com formulário |

### Painel Administrativo
| Rota | Descrição | Acesso |
|---|---|---|
| `/admin/login` | Login via Supabase Auth | Público |
| `/admin/dashboard` | Dashboard com estatísticas | Admin + Corretor |
| `/admin/imoveis` | Listagem de imóveis (CRUD) | Admin + Corretor |
| `/admin/imoveis/novo` | Cadastrar novo imóvel | Admin + Corretor |
| `/admin/imoveis/:id` | Editar imóvel | Admin + Corretor |
| `/admin/usuarios` | Gestão de usuários | Apenas Admin |
| `/admin/configuracoes` | Configurações do sistema | Apenas Admin |

---

## Configuração do Supabase

### 1. Criar Projeto no Supabase

1. Acesse [supabase.com](https://supabase.com) e crie uma conta gratuita
2. Crie um novo projeto
3. Anote a **Project URL** e a **Anon Key** (em Settings → API)

### 2. Executar o Schema SQL

No Supabase, acesse **SQL Editor** e execute o conteúdo do arquivo `supabase-schema.sql` localizado na raiz do projeto.

Isso criará:
- Tabela `user_profiles` (perfis de usuários)
- Tabela `properties` (imóveis com código automático IMV-XXXX)
- Tabela `property_images` (galeria de fotos)
- Tabela `settings` (configurações globais)
- Triggers automáticos de código e slug
- Políticas RLS (Row Level Security)

### 3. Criar Usuário Administrador

No Supabase, acesse **Authentication → Users** e clique em **Add user**:
- E-mail: `admin@suaimobiliaria.com.br`
- Senha: (escolha uma senha segura)

Depois, no **SQL Editor**, execute:
```sql
UPDATE user_profiles
SET role = 'admin'
WHERE email = 'admin@suaimobiliaria.com.br';
```

### 4. Configurar Storage (opcional)

Para upload direto de imagens:
1. Em **Storage**, crie um bucket chamado `property-images`
2. Configure como **público**
3. Adicione a política: `Allow public read access`

---

## Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto (ou configure no Vercel):

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-anon-key-aqui
```

> **Importante:** Sem essas variáveis, o site funciona com dados de demonstração (mock data). Isso é útil para visualizar o layout antes de conectar o banco.

---

## Deploy na Vercel

### Opção 1: Via GitHub (recomendado)

1. Faça push do código para um repositório GitHub
2. Acesse [vercel.com](https://vercel.com) e importe o repositório
3. Configure as variáveis de ambiente:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Clique em **Deploy**

### Opção 2: Via Vercel CLI

```bash
npm i -g vercel
vercel login
vercel --prod
```

### Configuração do Vercel (vercel.json)

Crie um arquivo `vercel.json` na raiz:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

---

## Desenvolvimento Local

```bash
# Instalar dependências
pnpm install

# Configurar variáveis de ambiente
cp .env.example .env
# Edite o .env com suas credenciais do Supabase

# Iniciar servidor de desenvolvimento
pnpm dev

# Build para produção
pnpm build
```

---

## Personalização

### Dados da Empresa

Edite as informações em `client/src/components/Header.tsx`, `Footer.tsx` e `pages/admin/AdminSettings.tsx`.

### WhatsApp

O número do WhatsApp padrão é `5511999999999`. Altere em:
- `client/src/components/WhatsAppFloat.tsx`
- `client/src/components/Header.tsx`
- `client/src/pages/admin/AdminSettings.tsx`

### Cores e Tipografia

O design system está em `client/src/index.css`. As cores principais são:
- **Dourado:** `oklch(0.72 0.12 75)` → equivale a `#C9A84C`
- **Grafite escuro:** `oklch(0.10 0.005 60)` → equivale a `#0F0F0F`
- **Creme:** `oklch(0.93 0.005 65)` → equivale a `#F5F0E8`

---

## Funcionalidades Implementadas

- [x] Site público responsivo com design premium
- [x] Página Home com hero, destaques, depoimentos e busca rápida
- [x] Listagem de imóveis com filtros avançados
- [x] Página de detalhes com galeria de fotos e mapa
- [x] Botão WhatsApp flutuante em todas as páginas
- [x] Mensagem automática personalizada por imóvel
- [x] Faixas diagonais de status sobre as fotos
- [x] Código automático de imóvel (IMV-1001, IMV-1002...)
- [x] Painel administrativo com login Supabase Auth
- [x] CRUD completo de imóveis
- [x] Gestão de usuários (Admin e Corretor)
- [x] Permissões por perfil
- [x] SEO: meta tags, robots.txt, URLs amigáveis
- [x] Dados mock para demonstração sem Supabase
- [x] Schema SQL completo para Supabase
- [x] Pronto para deploy na Vercel

---

## Suporte

Para dúvidas sobre configuração, consulte a documentação oficial:
- [Supabase Docs](https://supabase.com/docs)
- [Vercel Docs](https://vercel.com/docs)
- [React Docs](https://react.dev)
