# AGENTS.md

## Instrucoes Para Agentes

Este projeto e uma landing page React/Vite exportada do Figma Make para a Lidera Log Academy. Trate o repositorio como um frontend estatico, com foco em fidelidade visual, responsividade e baixo risco de regressao.

## Antes de Alterar

- Leia `CODEX.md`, `package.json`, `vite.config.ts`, `src/main.tsx` e as partes relevantes de `src/app/App.tsx`.
- Para qualquer acao remota, leia `ACESSO_AFS_LIDERA_LOG_ACADEMY_DOCKER.md` antes de conectar.
- Verifique `git status --short` antes de editar. Nao reverta alteracoes existentes sem pedido explicito.
- Confirme se a mudanca deve afetar apenas a landing page ou tambem componentes reutilizaveis.

## Comandos Permitidos/Esperados

```bash
npm install
npm run dev
npm run build
```

Nao assuma que existem lint, testes unitarios ou testes e2e; o `package.json` atual so define `dev` e `build`.

## Convencoes do Projeto

- Use TypeScript/TSX.
- Use imports com alias `@` quando fizer sentido para arquivos dentro de `src`.
- Mantenha React components funcionais.
- Preserve Tailwind CSS 4 e os estilos globais em `src/styles`.
- Preserve os componentes shadcn/Radix em `src/app/components/ui` como base generica.
- Para mudancas especificas da pagina, prefira editar `src/app/App.tsx`.
- Para mudancas de tokens globais, use `src/styles/theme.css`.
- Para fontes, use `src/styles/fonts.css`.

## Design e Conteudo

- A marca principal e Lidera Log Academy.
- A paleta dominante usa azul escuro (`#0D1B2A` e variacoes) com dourado (`#EBC150`, `#B8860B`, `#F3AE15`) como destaque.
- A tipografia principal combina Playfair Display para marca/titulos e Inter para textos e navegacao.
- Preserve secoes existentes e ancoras de navegacao: `#início`, `#sobre`, `#método`, `#modalidades`, `#contato`.
- Ao adicionar texto em portugues, mantenha tom corporativo, objetivo e voltado a treinamento/logistica.
- Evite adicionar efeitos visuais pesados que prejudiquem performance ou legibilidade.

## Cuidados Tecnicos

- Nao edite `dist/` manualmente. Se for necessario atualizar build, rode `npm run build`.
- Nao remova plugins do Vite; `react()` e `tailwindcss()` sao exigidos pelo projeto gerado.
- Nao adicione `.css`, `.tsx` ou `.ts` em `assetsInclude`; o comentario em `vite.config.ts` alerta contra isso.
- Nao apague assets de `src/imports` sem verificar todos os imports.
- Tenha cuidado com o componente `LogoWordmark`, pois ele contem SVG inline grande.
- A tela de carregamento depende de `HOLD_DURATION`, `EXIT_DURATION`, estados de fase e componentes `motion`.
- O hook `useInView` usa `IntersectionObserver`; preserve cleanup ao altera-lo.

## Validacao

Sempre que fizer alteracoes de codigo:

```bash
npm run build
```

Para alteracoes visuais, tambem rode o servidor local e valide manualmente:

```bash
npm run dev
```

Confira pelo menos:

- carregamento inicial e transicao para a pagina;
- navbar em desktop e mobile;
- links de ancora;
- imagens renderizadas;
- layout responsivo;
- ausencia de sobreposicao de texto.

## Politica de Mudancas

- Mantenha escopo pequeno e direto.
- Nao introduza novas bibliotecas sem necessidade clara.
- Nao reorganize a arquitetura inteira apenas para uma mudanca visual simples.
- Documente novas decisoes relevantes neste arquivo ou em `CODEX.md`.

## Ambiente Remoto

- Alvo SaveInCloud: `AFS-Microservicos > Dev > Site - lideralogacademy.com.br`.
- Host: `env-8825746.sp1.br.saveincloud.net.br`.
- Codigo validado em 2026-05-28: `/root/Projeto-AFS-Treinamento`.
- Docker/Compose configurado em 2026-05-28 com `Dockerfile`, `.dockerignore` e `docker-compose.yml`.
- Servico compose: `frontend`; container: `lidera-log-academy-site`; imagem: `lidera-log-academy-site:latest`; publicacao: `80:80`; rede: `lidera_log_academy_net`.
- Validacao no node `Docker Engine CE`: container `Up` e `healthy`, `http://127.0.0.1/` e `http://10.100.37.91/` retornando `200 OK`.
- A configuracao de NGINX/proxy publico e externa a este repositorio. Nao crie `nginx.conf` neste projeto; apenas valide o proxy no local responsavel pela publicacao.
