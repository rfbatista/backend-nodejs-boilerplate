# Boilerplate for a backend in NodeJs

In this boilerplate i try to follow [the twelve factor app](https://12factor.net/)

# Folder Structure

```
├── example.env
├── nodemon.json
├── package.json
├── README.md
├── src
│   ├── context
│   │   ├── container.ts
│   │   ├── handler.ts
│   │   ├── middleware.ts
│   │   ├── module-alias.ts
│   │   └── startup.ts
│   ├── core
│   │   ├── controller.ts
│   │   ├── domain
│   │   │   ├── entity.ts
│   │   │   └── value-object
│   │   │       ├── address.ts
│   │   │       ├── coordinates.ts
│   │   │       ├── money.ts
│   │   │       ├── price.ts
│   │   │       └── unique-identifier.ts
│   │   ├── health-controller.ts
│   │   ├── result.ts
│   │   ├── schema.ts
│   │   ├── usecase.ts
│   │   └── validation.ts
│   ├── index.ts
│   ├── infrastructure
│   │   ├── config
│   │   │   ├── environment.ts
│   │   │   └── index.ts
│   │   ├── data-source
│   │   │   ├── database-module.ts
│   │   │   └── postgres.ts
│   │   ├── error
│   │   │   ├── BaseError.ts
│   │   │   └── error-alias.ts
│   │   ├── HttpServer.ts
│   │   ├── Logger.ts
│   │   ├── middlewares
│   │   │   ├── error-handler.ts
│   │   │   ├── not-found-hanlder.ts
│   │   │   ├── request-Id.ts
│   │   │   └── result-handler.ts
│   │   └── server.ts
│   └── modules
├── tsconfig.json
└── yarn.lock
```
