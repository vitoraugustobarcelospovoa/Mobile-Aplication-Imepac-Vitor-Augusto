# IMEPAC Mobile & API – Cadastro de Beneficiários

[![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)]()
[![License](https://img.shields.io/badge/licença-Privado-red)]()
[![Java](https://img.shields.io/badge/Java-17-blue?logo=java)]()
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-brightgreen?logo=springboot)]()
[![H2](https://img.shields.io/badge/H2-embedded-lightgrey?logo=database)]()
[![Expo](https://img.shields.io/badge/Expo-53.x-black?logo=expo)]()
[![React Native](https://img.shields.io/badge/React%20Native-0.79.2-61DAFB?logo=react)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)]()
[![Maven](https://img.shields.io/badge/Maven-build-red?logo=apachemaven)]()
[![Git](https://img.shields.io/badge/Git-version%20control-orange?logo=git)]()

Aplicação **mobile** (Expo/React Native + TypeScript) acoplada a uma **API Spring Boot** para cadastro e listagem de beneficiários/usuários do IMEPAC.

> O repositório contém **dois projetos independentes** dentro da mesma pasta:
> 1. **`Mobile-Aplication-Back`** – API REST Spring Boot (Java 17, Maven).  
> 2. **`imepac-vitor-augusto`** – App móvel Expo (React Native 0.79, TypeScript).

---

## Índice

- [Estrutura de pastas](#estrutura-de-pastas)
- [Back‑end (Spring Boot)](#back-end-spring-boot)
  - [Configuração](#configuração)
  - [Rodando](#rodando)
- [Front‑end mobile (Expo)](#front-end-mobile-expo)
  - [Pré‑requisitos](#pré-requisitos)
  - [Rodando](#rodando-1)
  - [Integração com API](#integração-com-api)
- [Próximos passos](#próximos-passos)
- [Créditos](#créditos)

## Estrutura de pastas
```text
Mobile-Aplication-Imepac-Vitor-Augusto-main/
├── Mobile-Aplication-Back/          # API Spring Boot
│   ├── pom.xml
│   ├── src/main/java/...
│   └── data/db.mv.db                # Banco H2 persistente
└── imepac-vitor-augusto/            # App Expo + React Native
    ├── package.json
    ├── App.tsx | app.json
    └── src/
        ├── pages/                   # login, home, cadastro-beneficiario...
        └── components/
```

---

## Back‑end (Spring Boot)

### Configuração

`Mobile-Aplication-Back/src/main/resources/application.properties` já inclui:

```properties
spring.datasource.url=jdbc:h2:file:./data/db
spring.datasource.driverClassName=org.h2.Driver
spring.jpa.hibernate.ddl-auto=update
```

Isso usa **H2** em arquivo local (`data/db.mv.db`).  
Se preferir Postgres/MySQL, troque o driver e a `url`.

### Rodando

```bash
cd Mobile-Aplication-Back
# build
./mvnw clean package
# run
java -jar target/mobile-aplication-back-0.0.1-SNAPSHOT.jar
```

- API inicia em **http://localhost:8080**  
- Console H2 disponível em **/h2-console**

---

## Front‑end mobile (Expo)

### Pré‑requisitos
- **Node 20 +**
- **Expo CLI**  
  ```bash
  npm install -g expo-cli
  ```
- **Android Studio** ou **iOS Simulator** / dispositivo físico

### Rodando

```bash
cd imepac-vitor-augusto
npm install      # ou pnpm / yarn
npm start        # abre Expo Dev Tools
```

Em seguida:
- Pressione **a** para abrir no emulador Android.  
- Escaneie o QR Code no Expo Go para rodar no celular.

### Integração com API

O app usa **Axios** (`src/services/api.ts`) apontando para `http://10.0.2.2:8080` (emulador Android).  
Ajuste o **IP** conforme seu ambiente:

```ts
// src/services/api.ts
export const api = axios.create({
  baseURL: "http://<seu_ip_local>:8080",
});
```

---

## Próximos passos

| Área | Sugestões |
|------|-----------|
| **Segurança** | Adicionar Spring Security + JWT no backend; proteger rotas da API. |
| **Persistência** | Migrar de H2 para PostgreSQL; usar Flyway para versionar scripts SQL. |
| **Tests** | JUnit + Testcontainers (API) · Jest + React Native Testing Library (app). |
| **CI/CD** | GitHub Actions: Build Maven, Lint TS, Expo build / submit. |
| **Docker** | Criar `Dockerfile` para API e `docker-compose` contendo banco SQL + API. |
| **Design** | Adicionar tema Dark/Light, animações Reanimated e validações robustas nos formulários. |

---

## Créditos

- **Spring Boot** & **Spring Data JPA** – VMware  
- **H2 Database** – Thomas Müller  
- **Expo** & **React Native** – Meta / Expo  
- **Axios** – HTTP client  
- **Lombok** – Projeto open source

---

> **Licença privada.** Projeto acadêmico – não redistribuir sem autorização.
