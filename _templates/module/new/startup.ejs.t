---
inject: true
to: src/context/startup.ts
after: server,
---
    <%=  h.changeCase.camel(name) %>Module,
