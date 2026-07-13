# 📱 JP Mídia Indoor — Player Android TV

App responsável por **exibir** as mídias gerenciadas no [Dashboard JP Mídia Indoor](https://github.com/WamanaDev/JP-Midia-Indoor), transformando dispositivos Android em telas de **Digital Signage**.

> Parte do mesmo projeto autoral: um sistema Full Stack de gerenciamento de mídia digital que idealizei e desenvolvi sozinho, do zero ao deploy em produção.

---

## 🎯 Papel no sistema

```
Dashboard Web (admin cadastra/atualiza mídia)
        │
        ▼
  API + Supabase Realtime
        │
        ▼
  Player Android TV  ← este repositório
        │
        ▼
  TV / Monitor / Android Box
```

O Player escuta mudanças em tempo real (via Supabase Realtime) e atualiza a playlist automaticamente — sem precisar reiniciar ou dar refresh manual no dispositivo.

---

## ✨ Funcionalidades

- 📺 Reprodução de imagens e vídeos em tela cheia
- 🔄 Sincronização automática com o dashboard (tempo real)
- 🌐 Download e cache local dos conteúdos
- 🔁 Reprodução contínua da playlist
- 📡 Comunicação com a API do sistema

---

## 🛠️ Tecnologias

- **Kotlin**
- **Android SDK**
- **APIs REST** (comunicação com o backend NestJS)

---

## 🚀 Como executar

### Pré-requisitos
```
Android Studio
Dispositivo ou emulador Android TV
```

### Passos
```bash
git clone https://github.com/WamanaDev/Midia-Indoor-APP.git
```

Abra o projeto no Android Studio, configure a URL da API no arquivo de configuração e rode em um emulador Android TV ou dispositivo físico.

---

## 🎯 Casos de uso

Lojas · Restaurantes · Clínicas · Academias · Farmácias · Recepções · Totens de atendimento · Painéis informativos

---

## 🌐 Projeto relacionado

| Link | Descrição |
| --- | --- |
| 💻 [Dashboard (repositório)](https://github.com/WamanaDev/JP-Midia-Indoor) | Painel administrativo que alimenta este player |
| 🌐 [Demo do Dashboard](https://jpdash20.vercel.app/) | Ambiente em produção |

---

## 👨‍💻 Autor

**Wictor Pamplona** — Desenvolvedor Full Stack Júnior (Node.js/React)

- GitHub: [github.com/WamanaDev](https://github.com/WamanaDev)
- LinkedIn: [linkedin.com/in/wictor-pamplona](https://www.linkedin.com/in/wictor-pamplona)
- E-mail: wictorpamp@gmail.com
- 
