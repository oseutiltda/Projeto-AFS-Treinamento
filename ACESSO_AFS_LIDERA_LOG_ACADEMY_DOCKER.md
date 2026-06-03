# Guia de acesso ao ambiente remoto da Lidera Log Academy

## Objetivo

Este guia documenta o caminho operacional para acessar o ambiente remoto da SaveInCloud do site `lideralogacademy.com.br`.

Validacao remota realizada em 2026-05-28.

O alvo correto deste projeto e:

- grupo: `AFS-Microservicos`
- ambiente: `Dev`
- alias: `Site - lideralogacademy.com.br`
- host: `env-8825746.sp1.br.saveincloud.net.br`
- pasta do projeto no node da aplicacao: `/root/Projeto-AFS-Treinamento`

## Regra de uso deste guia

- Use este guia quando precisar acessar o ambiente remoto da Lidera Log Academy.
- Nao use caminhos herdados de outros projetos, como Plasticos Fabia, BMX, Transpallet ou Entre Pontos.
- Nao assuma que ha containers rodando antes de validar; na validacao de 2026-05-28, `docker ps` estava vazio.
- Nao edite configuracao de NGINX ou rode comandos de deploy sem validar o alvo e o estado atual.
- Este projeto e um frontend Vite/React estatico com build em `dist/`.

## Contexto

- O acesso passa por um menu interativo da plataforma SaveInCloud.
- O item do projeto aparece em `AFS-Microservicos > Dev`.
- O ambiente possui dois pontos principais:
  - `NGINX`, node `267772`, LAN IP `10.100.28.99`, WAN IP `200.150.203.87`
  - `Docker Engine CE`, node `267773`, LAN IP `10.100.37.91`
- Apesar do item chamar `Docker Engine CE`, na validacao nao havia containers ativos.

## Entrada via terminal

Use:

```bash
ssh -tt -o StrictHostKeyChecking=no -p 3022 35661@gate.paas.saveincloud.net.br
```

## Caminho no menu

Ao conectar, selecione os itens pelo nome. Os indices podem mudar, entao prefira sempre os rotulos.

1. `AFS-Microservicos`
2. `Dev`
3. `Site - lideralogacademy.com.br`
4. Para o projeto/codigo: `Docker Engine CE`
5. Para proxy/publicacao: `NGINX`

Na validacao de 2026-05-28, o menu exibiu:

```text
/AFS-Microservicos/Dev
  6. env-8825746.sp1.br.saveincloud.net.br  Running  Site - lideralogacademy.com.br
```

Ao entrar no item do ambiente:

```text
Dev/env-8825746.sp1.br.saveincloud.net.br
  2. [M] NGINX             267772  10.100.28.99  200.150.203.87
  3. [M] Docker Engine CE  267773  10.100.37.91  -
```

O shell do node da aplicacao abriu com prompt semelhante a:

```bash
root@node267773-env-8825746 ~ $
```

O shell do node NGINX abriu com prompt semelhante a:

```bash
nginx@node267772-env-8825746 ~ $
```

## Como validar que o acesso certo foi aberto

No item `Docker Engine CE`, valide:

```bash
pwd
ls -la
ls -la ~/Projeto-AFS-Treinamento
cd ~/Projeto-AFS-Treinamento
git remote -v
git status --short
docker ps --format 'table {{.Names}}\t{{.Status}}\t{{.Ports}}'
ss -lntp
```

Sinais esperados na validacao de 2026-05-28:

- `pwd` inicial: `/root`
- pasta do projeto: `/root/Projeto-AFS-Treinamento`
- remote git:

```text
origin git@github-projeto-afs:oseutiltda/Projeto-AFS-Treinamento.git
```

- `git status --short`: sem saida
- `docker ps`: apenas cabecalho, sem containers ativos
- portas ouvindo no node da aplicacao: SSH/RPC; sem processo em `80`, `3000` ou `5173`

Se a pasta ou o remote forem diferentes, pare e valide o alvo antes de executar qualquer manutencao.

## Diretorio do projeto na VPS

O diretorio correto encontrado foi:

```bash
/root/Projeto-AFS-Treinamento
```

Entrada:

```bash
cd ~/Projeto-AFS-Treinamento
pwd
ls -la
```

Arquivos esperados:

```text
package.json
package-lock.json
vite.config.ts
src/
public/
dist/
```

Na validacao, `dist/` existia e continha:

```text
dist/index.html
dist/assets/index-CeT6v--S.js
dist/assets/index-or-K2Q3o.css
```

## Comandos do projeto

O projeto usa npm como fluxo principal:

```bash
npm install
npm run build
```

Scripts disponiveis no `package.json`:

```text
dev   -> vite
build -> vite build
```

Nao ha scripts de lint ou testes configurados.

## Estado do Docker

Na validacao de 2026-05-28:

```bash
docker ps --format 'table {{.Names}}\t{{.Status}}\t{{.Ports}}'
```

retornou:

```text
NAMES     STATUS    PORTS
```

Ou seja, nao havia containers ativos no node `Docker Engine CE`.

Nao use comandos de `docker compose` como premissa de manutencao deste projeto sem antes confirmar que um compose passou a existir.

## Estado do NGINX

No item `NGINX`, a configuracao validada por `nginx -T` mostrava proxy para o node da aplicacao:

```text
upstream default_upstream {
  server 10.100.37.91;
}

upstream common {
  server 10.100.37.91;
}
```

Portas no node NGINX:

```text
0.0.0.0:80 -> nginx
```

Na validacao de 2026-05-28, os testes HTTP retornaram:

```bash
curl -I --max-time 5 http://localhost/
curl -I --max-time 8 http://10.100.37.91/
curl -I --max-time 8 http://lideralogacademy.com.br/
```

Resultados observados:

- `http://localhost/` no node NGINX: `HTTP/1.1 502 Bad Gateway`
- `http://10.100.37.91/`: connection refused na porta `80`
- `http://lideralogacademy.com.br/`: `HTTP/1.1 502 Bad Gateway`

Isso indica que o NGINX estava ativo, mas o node da aplicacao nao tinha servico ouvindo na porta `80` no momento da validacao.

## Comandos iniciais recomendados

No node `Docker Engine CE`:

```bash
cd ~/Projeto-AFS-Treinamento
git status --short
git remote -v
ls -la dist dist/assets
docker ps
ss -lntp
```

No node `NGINX`:

```bash
nginx -T | sed -n '1,220p'
ss -lntp
curl -I --max-time 5 http://localhost/
curl -I --max-time 8 http://10.100.37.91/
```

## Observacoes operacionais

- Para localizar o codigo, entre em `Docker Engine CE` e use `/root/Projeto-AFS-Treinamento`.
- Para validar proxy/publicacao, entre em `NGINX`.
- O dominio publico esperado e `lideralogacademy.com.br`.
- Como o projeto e Vite/React estatico, uma publicacao funcional precisa de algum servico servindo `dist/` ou outro artefato equivalente na porta esperada pelo NGINX.
- Na validacao, o NGINX apontava para `10.100.37.91:80`, mas esse destino recusava conexao.
- Antes de rodar `git pull`, `npm install`, `npm run build` ou configurar servico, confirme `git status --short`.
- Ao sair do shell remoto com `exit`, o menu volta. Use `0` repetidamente ate encerrar a conexao.
