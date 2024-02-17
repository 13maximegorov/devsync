# DevSync

**DevSync** — это приложение мгновенного обмена сообщениями, организации аудио- и видеоконференций для команд разработки программного обеспечения.

Технологический стек:

1. TypeScript
2. React
3. Next.js
4. shadcn/ui
5. Tailwind CSS
6. Zustand
7. Prisma
8. Zod
9. PostgreSQL
10. Socket.IO
11. TanStack Query
12. LiveKit (Golang)
13. ESLint
14. Prettier
15. Docker
16. Caddy

## Как запустить DevSync

### Development

#### Первый вариант

```zsh
npm ci
npm run dev
docker-compose up -d
```

#### Второй вариант

```zsh
docker-compose -f "docker-compose.dev.yaml" up -d
```
