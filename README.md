# Boilerplate for a backend in NodeJs

In this boilerplate i try to follow [the twelve factor app](https://12factor.net/)

# Folder Structure

```
.
├── context
│   ├── container.ts
│   ├── handler.ts
│   ├── middleware.ts
│   ├── module-alias.ts
│   └── startup.ts
├── index.ts
├── infrastructure
│   ├── config
│   │   ├── environment.ts
│   │   └── index.ts
│   ├── data_source
│   │   ├── database-module.ts
│   │   ├── postgres.ts
│   │   └── sequelize.ts
│   ├── error
│   │   ├── BaseError.ts
│   │   └── error-alias.ts
│   ├── graphql-server.ts
│   ├── HealthController.ts
│   ├── HttpServer.ts
│   ├── Logger.ts
│   ├── middlewares
│   │   ├── error-handler.ts
│   │   ├── not-found-hanlder.ts
│   │   ├── request-Id.ts
│   │   └── result-handler.ts
│   └── server.ts
├── modules
│   └─── customers_relationship
│       ├── entities
│       │   ├── contact.ts
│       │   └── customer.ts
│       ├── errors
│       │   └── contact.ts
│       ├── graphql
│       │   └── contact.ts
│       ├── repositories
│       │   ├── contact-repo.ts
│       │   └── models
│       │       ├── contact-model.ts
│       │       └── customer-model.ts
│       ├── use_cases
│       │   └── CreateContact.ts
│       └── value_object
│           └── identity-document.ts
├── shared
│   ├── AggregateRoot.ts
│   ├── BaseError.ts
│   ├── controller.ts
│   ├── entity.ts
│   ├── errors
│   │   └── EmailErrors.ts
│   ├── hash.ts
│   ├── result.ts
│   ├── schema.ts
│   ├── usecase.ts
│   ├── validation.ts
│   ├── value_objects
│   │   ├── Address.ts
│   │   ├── coordinates.ts
│   │   ├── Email.ts
│   │   ├── money.ts
│   │   ├── price.ts
│   │   └── unique-identifier.ts
│   └── ValueObject.ts

27 directories, 55 files
```
