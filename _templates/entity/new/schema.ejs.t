---
to: src/h.changeCase.snakes/<%= h.changeCase.snake %>/repositories/schemas/<%= h.changeCase.pascal %>Schema.ts
unless_exists: true
---
import <%= h.changeCase.pascal %> from "@h.changeCase.snakes/<%= h.changeCase.snake %>/entities/<%= h.changeCase.pascal %>";

type SchemaProps = {
  id: string;
  company_id: string;
}

export default class <%= h.changeCase.pascal %>Schema extends <%= h.changeCase.pascal %> {
  id: string;
  company_id: string;

  static fromEntity(entity: <%= h.changeCase.pascal %>): SchemaProps {
    return {
      id: entity.id,
      company_id: entity.companyId,
    }
  }

  static toEntity(schema: SchemaProps): <%= h.changeCase.pascal %> {
    return new <%= h.changeCase.pascal %>({
      companyId: schema.company_id
    }, schema.id)
  }

}
