grocary app (owner: Martin)

Prerequisites
- Node 18+, npm
- Docker & docker-compose (for local Postgres if desired)

Quick local (dev)
1. cp .env.example .env
2. npm install
3. Run Postgres locally or use docker-compose:
   docker-compose up -d db
4. Run migrations:
   psql $DATABASE_URL -f migrations/1630000000000-init.sql
5. npm run start:dev
6. API base: http://localhost:3000/api/v1
   - Swagger: /api/v1/docs

Docker (local)
- docker-compose up --build

Database migrations
- migrations/1630000000000-init.sql included. Apply via psql:
  psql $DATABASE_URL -f migrations/1630000000000-init.sql

Testing
- npm test

Build & Run (production)
- npm run build
- node dist/main.js

API Examples (use actual host:port)
- Register:
  curl -X POST http://localhost:3000/api/v1/register -H "Content-Type: application/json" -d '{"email":"a@b.com","password":"secret1"}'
- Login:
  curl -X POST http://localhost:3000/api/v1/login -H "Content-Type: application/json" -d '{"email":"a@b.com","password":"secret1"}'
- Add item (authenticated):
  curl -X POST http://localhost:3000/api/v1/items -H "Authorization: Bearer <token>" -H "Content-Type: application/json" -d '{"name":"apple","quantity":2,"store":"Local"}'
- List items:
  curl -X GET http://localhost:3000/api/v1/items -H "Authorization: Bearer <token>"

Python script
- cd python
- pip install -r requirements.txt
- export DATABASE_URL=postgres://postgres:postgres@db:5432/grocary
- python most_frequent_items.py
