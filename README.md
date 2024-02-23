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
9. Auth.js
10. PostgreSQL
11. Socket.IO
12. TanStack Query
13. LiveKit (Golang)
14. ESLint
15. Prettier
16. Docker
17. Caddy
18. MinIO (S3 Object Storage)

## Как запустить DevSync

### Development

#### Запуск всех сервисов в Docker (PostgreSQL, LiveKit, MinIO, Create Bucket)

```shell
docker-compose up -d
```

#### Установка всех пакетов NPM

```shell
npm i
```

#### Настройка Prism

```shell
npm run prisma:generate:dev
npm run db:push:dev
```

#### Запуск приложения

```shell
npm run dev
```

## TODO:

- [ ] Обновить LiveKit
- [ ] Внедрить редактор текста Tiptap
- [ ] Доделать docker-compose для production
- [ ] Добавить в README раздел "Production"
