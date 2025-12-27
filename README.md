# OW2DmmoEngine

`README Version Dec_12_2025`

A browser-first open-world MMO engine prototype: **Next.js client + Spring Boot server**, built for real-time iteration.

- **Frontend:** Next.js + Tailwind + Phaser sandbox ([frontend/src/app/page.tsx](frontend/src/app/page.tsx), [frontend/src/components/GameCanvas.tsx](frontend/src/components/GameCanvas.tsx), [frontend/src/components/GameCanvasWrapper.tsx](frontend/src/components/GameCanvasWrapper.tsx))
- **Backend:** Spring Boot API (PoC auth ping) ([backend/src/main/java/com/game/server/api/AuthController.java](backend/src/main/java/com/game/server/api/AuthController.java))
- **CORS:** preconfigured for local dev ([backend/src/main/java/com/game/server/config/CorsConfig.java](backend/src/main/java/com/game/server/config/CorsConfig.java))

---

## What you can do right now

- Open the web client, see the Phaser canvas boot.
- Click **“Test Login”** to verify the browser can reach the Java backend endpoint:
  - `POST /api/auth/test-login` → handled by [`com.game.server.api.AuthController#testLogin`](backend/src/main/java/com/game/server/api/AuthController.java)

---

## Quickstart (local dev)

### 1) Backend (Spring Boot)
From `backend/`:

```bash
./mvnw spring-boot:run
# or: mvn spring-boot:run
```

Server entrypoint: [`com.game.server.MmoApplication`](backend/src/main/java/com/game/server/MmoApplication.java) (default port **8080**).

### 2) Frontend (Next.js)
From `frontend/`:

```bash
npm install
npm run dev
```

App runs on **http://localhost:3000**.

---

## Configuration

### Frontend → Backend URL
The UI reads:

- `NEXT_PUBLIC_API_BASE_URL` (defaults to `http://localhost:8080`) in [frontend/src/app/page.tsx](frontend/src/app/page.tsx)

Example:

```bash
# from frontend/
export NEXT_PUBLIC_API_BASE_URL="http://localhost:8080"
npm run dev
```

### CORS (local)
Allowed origins are set in [`com.game.server.config.CorsConfig`](backend/src/main/java/com/game/server/config/CorsConfig.java).

---

## Repo layout

- `backend/` — Spring Boot API ([backend/pom.xml](backend/pom.xml))
- `frontend/` — Next.js client ([frontend/package.json](frontend/package.json))
- `infra/` — infrastructure-related files (WIP)

---

## Roadmap (short + honest)

- Replace PoC login with real auth (JWT/session).
- Add realtime transport + world/state sync.
- Move Phaser assets from remote demo URLs to local project assets.

---

## License

Apache 2.0 — see [LICENSE](LICENSE).
