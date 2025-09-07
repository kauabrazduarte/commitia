# 🚀 Commitia

> **Commit messages powered by AI.**
Gere mensagens de commit inteligentes, consistentes e bonitas usando múltiplos provedores de IA — direto do seu terminal.

---

## 📛 Badges

![npm](https://img.shields.io/npm/v/commitia?color=%239b59b6&style=for-the-badge)
![downloads](https://img.shields.io/npm/dt/commitia?color=%239b59b6&style=for-the-badge)
![typescript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff&style=for-the-badge)
![contributions](https://img.shields.io/badge/contributions-welcome-%239b59b6?style=for-the-badge)
![license](https://img.shields.io/github/license/SeuUser/commitia?color=%239b59b6&style=for-the-badge)

---

## ✨ Features

- 🔑 **Login simples** com escolha de provedor, chave e modelo.
- 🤖 **Suporte a vários provedores**:
  - XAI
  - OpenAI
  - Anthropic
  - Google
  - NagaIA
- 💬 **Geração automática de mensagens de commit** com edição/cópia opcional.
- 🎨 **Interface no terminal bem trabalhada**, amigável e prática.
- 🪄 **Atalho rápido** para adicionar todos os arquivos (`-A` / `--add`).

---

## 📦 Instalação

```bash
npm install -g commitia
````

Ou use sem instalar, com o [npx](https://docs.npmjs.com/cli/v9/commands/npx):

```bash
npx commitia
```

---

## 🔑 Autenticação

Antes de começar, faça login com o provedor de sua escolha:

```bash
commitia login
```

Aqui você escolhe:

1. **Provedor** (XAI, OpenAI, Anthropic, Google ou NagaIA)
2. **API Key** do provedor
3. **Modelo** de IA

---

## ⚡ Uso

### Commit normal

```bash
commitia
```

> Gera a mensagem de commit com base nos arquivos em *staging* (`git add`).

---

### Commit adicionando tudo

```bash
commitia -A
# ou
commitia --add
```

> Adiciona **todos** os arquivos automaticamente e gera o commit.

---

### Personalização

* ✍️ Você pode **editar a mensagem** sugerida pela IA.
* 📋 Ou apenas **copiar a mensagem** sem commitar.
* 🚀 O `push` é manual:

```bash
git push
```

---

## 📸 Exemplo de fluxo

```bash
git add src/index.ts
commitia
# IA sugere uma mensagem ✨
# Você edita ou aceita
git push
```

---

## 🛠️ Contribuição

Contribuições são **bem-vindas**!
Abra uma issue, sugira melhorias ou mande um PR.

---

## ⚖️ Licença

MIT © kaua.dev.br
