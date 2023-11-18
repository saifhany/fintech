## Features

- [x] Database ([typeorm](https://www.npmjs.com/package/typeorm)).
- [x] Seeding.
- [x] Config Service ([@nestjs/config](https://www.npmjs.com/package/@nestjs/config)).
- [x] Sign in and sign up via email.
- [x] Admin and User roles.
- [x] Swagger.
- [x] Docker.

## Quick run

```bash
git clone --depth 1 https://github.com/saifhany/fintech.git my-app
cd my-app/
cp env-example .env
```


## Comfortable development

```bash
git clone --depth 1 https://github.com/saifhany/fintech.git my-app
cd my-app/
cp env-example .env
```





```bash
npm install

npm run migration:run

npm run seed:run

npm run start:dev
```

## Links

- Swagger: <http://localhost:3000/docs>


## Database utils

Generate migration

```bash
npm run migration:generate -- src/database/migrations/CreateNameTable
```

Run migration

```bash
npm run migration:run
```

Revert migration

```bash
npm run migration:revert
```

Drop all tables in database

```bash
npm run schema:drop
```

Run seed

```bash
npm run seed:run
```

## Tests

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e
```

##  Docker

```bash
docker build -t test:v1 .
docker run -d -it -p 80:3000 --restart=always test:v1
```
```
## external 3rd party api
```https://documenter.getpostman.com/view/1134062/T1LJjU52#c47920fa-af20-4444-b567-efc4f1f46498```

