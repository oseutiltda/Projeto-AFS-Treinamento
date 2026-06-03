# Guia de PR com `vrodrigues06`

## Objetivo

Este guia define o fluxo padrao para publicar mudancas deste repositorio via Pull Request usando a conta GitHub `vrodrigues06`.

Regra principal:

- mudanca nova sempre sai de uma branch nova
- a branch nunca deve ser `main`
- o PR deve apontar para `oseutiltda/Projeto-AFS-Treinamento:main`
- quando `vrodrigues06` nao tiver permissao de escrita no `origin`, o fluxo deve usar fork

## Quando usar este fluxo

Use este procedimento sempre que houver alteracoes locais que precisem ser enviadas para revisao ou integracao.

Se a alteracao ainda nao tiver branch propria, crie uma branch nova antes de commitar.

## Pre-condicoes

Antes de iniciar:

1. Confirme que esta no repositorio correto.
2. Leia `AGENTS.md` e `CODEX.md`.
3. Verifique as alteracoes locais.
4. Confirme que a conta ativa do GitHub CLI e `vrodrigues06`.

Comandos:

```bash
pwd
git status --short
git branch --show-current
gh auth status
gh repo view --json nameWithOwner,defaultBranchRef,viewerPermission,isFork
```

Sinais esperados:

- repositorio: `oseutiltda/Projeto-AFS-Treinamento`
- branch base: `main`
- conta ativa no `gh`: `vrodrigues06`

## Regra de branch

Para mudanca nova, sempre crie uma branch nova a partir de `main`.

Padroes recomendados:

- `feat/nome-curto-da-mudanca`
- `fix/nome-curto-do-ajuste`
- `docs/nome-curto-da-documentacao`
- `chore/nome-curto-da-tarefa`

Exemplos:

```bash
git switch main
git pull --ff-only origin main
git switch -c feat/cta-whatsapp
```

Se as alteracoes ja estiverem locais em `main` e ainda nao houver commit, mova o trabalho para uma branch nova sem perder o estado atual:

```bash
git switch -c feat/cta-whatsapp
```

## Conta Git e autoria

Antes de commitar, configure a autoria local para `vrodrigues06` neste repositorio.

Comandos:

```bash
git config user.name "Vitor Rodrigues"
git config user.email "63791282+vrodrigues06@users.noreply.github.com"
```

Verificacao:

```bash
git config user.name
git config user.email
```

## Validacao obrigatoria

Para este projeto, valide pelo menos:

```bash
npm run build
npm run dev
```

Checklist minimo:

- carregamento inicial
- transicao da loading screen
- navbar desktop e mobile
- links de ancora
- imagens da landing page
- responsividade
- ausencia de sobreposicao de texto

## O que entra no commit

Antes de adicionar arquivos:

```bash
git status --short
git diff --stat
```

Regras:

- nao reverta alteracoes de terceiros sem pedido explicito
- nao edite `dist/` manualmente
- se `dist/` passar a ser ignorado, remova do versionamento de forma consistente
- inclua documentacao quando a mudanca alterar o processo operacional

Adicao seletiva:

```bash
git add src/app/App.tsx
git add package-lock.json
git add Dockerfile docker-compose.yml .dockerignore .gitignore
git add ACESSO_AFS_LIDERA_LOG_ACADEMY_DOCKER.md AGENTS.md CODEX.md
git add GUIA_PR_VRODRIGUES06.md
```

Se precisar parar de rastrear arquivos ja cobertos pelo `.gitignore`, use:

```bash
git rm --cached <arquivo>
```

## Commit

Use mensagem objetiva e coerente com o escopo.

Exemplos:

```bash
git commit -m "feat: atualiza CTAs para WhatsApp e documenta deploy"
git commit -m "docs: adiciona guia de PR com vrodrigues06"
```

## Fluxo com fork do `vrodrigues06`

Se `gh repo view` mostrar `viewerPermission: READ`, assuma que o push nao vai para `origin`.

Nesse caso:

1. Crie ou reutilize o fork `vrodrigues06/Projeto-AFS-Treinamento`.
2. Publique a branch no fork.
3. Abra o PR do fork para o repositorio principal.

Fluxo recomendado:

```bash
gh repo fork oseutiltda/Projeto-AFS-Treinamento --remote fork
git push -u fork <nome-da-branch>
gh pr create --repo oseutiltda/Projeto-AFS-Treinamento --base main --head vrodrigues06:<nome-da-branch>
```

Se o fork ja existir, apenas confirme os remotes:

```bash
git remote -v
```

Resultado esperado:

- `origin` aponta para `oseutiltda/Projeto-AFS-Treinamento`
- `fork` aponta para `vrodrigues06/Projeto-AFS-Treinamento`

## Estrutura recomendada do PR

Titulo:

```text
feat: atualiza CTAs para WhatsApp e documenta operacao Docker
```

Descricao recomendada:

```markdown
## Resumo
- atualiza CTAs da landing page para abrir conversa no WhatsApp
- adiciona arquivos de Docker e documentacao operacional
- registra o fluxo padrao de PR com a conta vrodrigues06

## Validacao
- npm run build
- validacao manual com npm run dev

## Observacoes
- PR aberto a partir de branch nova no fork vrodrigues06
```

## Comandos completos de referencia

Quando a mudanca for nova e ainda sem branch:

```bash
git switch main
git pull --ff-only origin main
git switch -c feat/nome-da-mudanca
git config user.name "Vitor Rodrigues"
git config user.email "63791282+vrodrigues06@users.noreply.github.com"
npm run build
npm run dev
git status --short
git add <arquivos>
git commit -m "feat: descricao objetiva"
gh repo fork oseutiltda/Projeto-AFS-Treinamento --remote fork
git push -u fork feat/nome-da-mudanca
gh pr create --repo oseutiltda/Projeto-AFS-Treinamento --base main --head vrodrigues06:feat/nome-da-mudanca
```

Quando as alteracoes ja estiverem locais e ainda sem branch:

```bash
git switch -c feat/nome-da-mudanca
git config user.name "Vitor Rodrigues"
git config user.email "63791282+vrodrigues06@users.noreply.github.com"
npm run build
git status --short
git add <arquivos>
git commit -m "feat: descricao objetiva"
gh repo fork oseutiltda/Projeto-AFS-Treinamento --remote fork
git push -u fork feat/nome-da-mudanca
gh pr create --repo oseutiltda/Projeto-AFS-Treinamento --base main --head vrodrigues06:feat/nome-da-mudanca
```

## Regras que nao devem ser quebradas

- nunca commitar mudanca nova direto em `main`
- nunca abrir PR a partir de `main`
- sempre usar branch nova quando a alteracao for nova
- sempre validar a conta ativa do `gh`
- sempre validar `npm run build`
- quando necessario, usar o fork `vrodrigues06`
- sempre revisar `git status --short` antes de commit e antes de push
