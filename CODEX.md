# CODEX.md

## Visao Geral

Este repositorio e uma landing page React/Vite da Lidera Log Academy, originada de um bundle exportado do Figma Make. A aplicacao mostra uma tela de carregamento animada e, depois, uma pagina institucional com secoes de hero, dores, solucao, metodologia, modalidades, CTA e rodape.

O projeto e majoritariamente frontend estatico. Nao ha backend, rotas de API, banco de dados ou suite de testes configurada.

## Stack

- React 18 com TypeScript.
- Vite 6.
- Tailwind CSS 4 via `@tailwindcss/vite`.
- Motion via `motion/react`.
- Icones com `lucide-react`.
- Componentes base em `src/app/components/ui`, no estilo shadcn/Radix.
- Assets importados do Figma em `src/imports`.

## Comandos

Use npm como fluxo principal, pois o projeto possui `package-lock.json` e o README original referencia npm.

```bash
npm install
npm run dev
npm run build
```

Observacoes:

- `npm run dev` inicia o Vite para desenvolvimento local.
- `npm run build` gera a build em `dist/`.
- Nao existe script de lint, formatacao ou testes no `package.json`.
- Existe `pnpm-workspace.yaml`, mas nao ha `pnpm-lock.yaml`; evite misturar gerenciadores sem necessidade.

## Fluxo de PR

Para publicar mudancas via GitHub com a conta `vrodrigues06`, siga o guia dedicado em `GUIA_PR_VRODRIGUES06.md`.

Regra operacional: mudanca nova sai sempre de branch nova, nunca de `main`.

## Estrutura Relevante

- `ACESSO_AFS_LIDERA_LOG_ACADEMY_DOCKER.md`: guia validado de acesso ao ambiente SaveInCloud `Site - lideralogacademy.com.br`.
- `Dockerfile`: build multi-stage; compila o Vite com Node 22 e serve `dist/` com NGINX oficial.
- `docker-compose.yml`: servico `frontend` publicado em `80:80`, container `lidera-log-academy-site`.
- `.dockerignore`: exclui dependencias, build local, Git e envs do contexto Docker.
- `src/main.tsx`: ponto de entrada React; importa `src/styles/index.css`.
- `src/app/App.tsx`: componente principal e quase toda a experiencia visual da landing page.
- `src/app/components/ui/`: componentes reutilizaveis shadcn/Radix gerados.
- `src/app/components/figma/ImageWithFallback.tsx`: helper de imagem vindo do Figma.
- `src/styles/index.css`: agrega fontes, Tailwind e tema.
- `src/styles/theme.css`: tokens CSS, tema e estilos base.
- `src/styles/tailwind.css`: configuracao de import/source do Tailwind 4.
- `src/styles/fonts.css`: importa Playfair Display e Inter via Google Fonts.
- `src/imports/`: imagens, SVGs e caminhos vetoriais exportados.
- `public/logo-wordmark.svg`: asset publico.
- `guidelines/Guidelines.md`: template original de guidelines do Figma, ainda sem regras customizadas.

## Arquitetura da UI

`App.tsx` contem:

- `LoadingScreen`: tela inicial animada.
- `LandingPage`: pagina principal apos o carregamento.
- `Navbar`, `HeroSection`, `PainSection`, `WhatWeDoSection`, `MethodSection`, `ModalitiesSection`, `CTASection` e `Footer`.
- Helpers internos como `LogoWordmark`, `LogoMark`, `useInView` e `FadeIn`.

As constantes `HOLD_DURATION` e `EXIT_DURATION` controlam o tempo da tela de carregamento.

## Padroes de Edicao

- Preserve a identidade visual: fundo azul escuro, dourado como cor de destaque, tipografia Playfair Display para marca/titulos e Inter para texto de interface.
- Ao alterar conteudo ou layout, priorize responsividade em desktop e mobile. A navbar possui comportamento separado para `md` e mobile.
- Evite mexer nos componentes de `src/app/components/ui` se a mudanca for especifica da landing page; altere primeiro `App.tsx` e estilos locais/globais.
- Preserve o alias `@` configurado no Vite para imports a partir de `src`.
- Nao remova `react()` nem `tailwindcss()` de `vite.config.ts`; o comentario do arquivo indica que ambos sao necessarios para o Make.
- Evite editar manualmente arquivos de build em `dist/`; gere novamente com `npm run build` quando precisar atualizar a build.
- Assets em `src/imports` vieram do Figma. Antes de apagar ou renomear imagens/SVGs, verifique imports em `App.tsx` e subpastas.

## Validacao Recomendada

Para mudancas visuais ou estruturais:

1. Execute `npm run build`.
2. Execute `npm run dev`.
3. Confira a pagina no navegador em larguras desktop e mobile.
4. Verifique se a tela de carregamento aparece, transiciona e libera a landing page corretamente.

Como nao ha testes automatizados, a validacao visual/manual e parte importante do fluxo.

## Ambiente Remoto

O ambiente remoto validado fica em `AFS-Microservicos > Dev > Site - lideralogacademy.com.br`, host `env-8825746.sp1.br.saveincloud.net.br`.

Consulte `ACESSO_AFS_LIDERA_LOG_ACADEMY_DOCKER.md` antes de qualquer manutencao remota.

Atualizacao de 2026-05-28: o Docker foi configurado no projeto com `Dockerfile`, `.dockerignore` e `docker-compose.yml`. No node `Docker Engine CE`, o compose sobe o container `lidera-log-academy-site` com imagem `lidera-log-academy-site:latest`, porta `80:80`, healthcheck HTTP e rede `lidera_log_academy_net`. A validacao remota retornou `200 OK` em `http://127.0.0.1/` e `http://10.100.37.91/`.

A configuracao de NGINX/proxy publico nao fica neste repositorio. Nao adicione `nginx.conf` aqui; valide e altere NGINX no local externo responsavel pela publicacao.
