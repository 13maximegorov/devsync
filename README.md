![DevSync](./logo_light.png#gh-dark-mode-only)
![DevSync](./logo_dark.png#gh-light-mode-only)

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

#### Настройка файла .env.development

```js
POSTGRES_PASSWORD=postgres
POSTGRES_USER=postgres
POSTGRES_DB=postgres

DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:5432/${POSTGRES_DB}?schema=public

AUTH_SECRET=
AUTH_URL=http://localhost:3000/api/auth

YANDEX_CLIENT_ID=
YANDEX_CLIENT_SECRET=

SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=
SMTP_FROM_EMAIL=

MINIO_ROOT_USER=
MINIO_ROOT_PASSWORD=

S3_ACCESS_KEY=
S3_ACCESS_SECRET_KEY=
S3_BUCKET=
S3_ENDPOINT=http://localhost:9000

LIVEKIT_API_KEY=APIRmV5JPxDKCoC
LIVEKIT_API_SECRET=KoftdQCncHktCUspx78BSeMhxwXotnzANWefz6EteMhG
NEXT_PUBLIC_LIVEKIT_URL=ws://localhost:7880

NEXT_PUBLIC_APP_URL=http://localhost:3000
```

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

### Production

Домен и поддомены, требуемые для работы приложения в production:

- `<domain>`
- `livekit.<domain>`
- `livekit-turn.<domain>`
- `s3.<domain>`
- `s3-console.<domain>`

Вместо `<domain>` укажите основной домен (например, example.com).

#### Настройка файла .env.production

```js
POSTGRES_PASSWORD=postgres
POSTGRES_USER=postgres
POSTGRES_DB=postgres

DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@postgres:5432/${POSTGRES_DB}?schema=public

AUTH_SECRET=
AUTH_URL=https://<domain>/api/auth

YANDEX_CLIENT_ID=
YANDEX_CLIENT_SECRET=

SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=
SMTP_FROM_EMAIL=

MINIO_ROOT_USER=
MINIO_ROOT_PASSWORD=

S3_ACCESS_KEY=
S3_ACCESS_SECRET_KEY=
S3_BUCKET=
S3_ENDPOINT=https://s3.<domain>

LIVEKIT_API_KEY=APIkZCtoqxmZ8nj
LIVEKIT_API_SECRET=TtE974f1YU8XT1XmlA4EYM7SDwec6QehsVwhfI9cMKLD
NEXT_PUBLIC_LIVEKIT_URL=wss://livekit.<domain>

NEXT_PUBLIC_APP_URL=https://<domain>
```

#### Запуск сервисов в Docker (PostgreSQL, MinIO, Create Bucket, Next.js)

```shell
docker-compose -f docker-compose.prod.yaml up -d
```

#### Запуск сервисов в Docker (LiveKit, Redis, Caddy)

```shell
cd livekit
docker-compose up -d
```
