---
inject: true
to: src/context/startup.ts
after: import { server } from '@infrastructure/server'
---
import <%= h.changeCase.camel(name) %>Module from "@modules/<%= h.changeCase.snake(name) %>"
