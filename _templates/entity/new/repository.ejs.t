---
to: src/h.changeCase.snakes/<%= h.changeCase.snake %>/repositories/<%= h.changeCase.pascal %>Repository.ts
unless_exists: true
---
import <%= h.changeCase.pascal %>Schema from "@h.changeCase.snakes/<%= h.changeCase.snake %>/repositories/schemas/<%= h.changeCase.pascal %>Schema";
import <%= h.changeCase.pascal %> from "@h.changeCase.snakes/<%= h.changeCase.snake %>/entities/<%= h.changeCase.pascal %>";
import Prisma from "@infrastructure/data_source/prisma";
import { Logger } from "@infrastructure/Logger";
import { Service } from "typedi";

@Service()
export default class <%= h.changeCase.pascal %>Repository {

  constructor(private database: Prisma){}

  async create(entity: <%= h.changeCase.pascal %>): Promise<<%= h.changeCase.pascal %>> {
    try {
      const <%= h.changeCase.pascal %>Schema = <%= h.changeCase.pascal %>Schema.fromEntity(entity)
      const raw<%= h.changeCase.pascal %> = await this.database.<%= h.changeCase.pascal %>.create({
        data: <%= h.changeCase.pascal %>Schema
      });
      const entitySaved = <%= h.changeCase.pascal %>Schema.toEntity(raw<%= h.changeCase.pascal %>)
      return entitySaved
    } catch (error) {
      Logger.error("saving <%= h.changeCase.pascal %> failed", error);
      throw error;
    }
  }

  async update(entity: <%= h.changeCase.pascal %>): Promise<<%= h.changeCase.pascal %>> {
    try {
      const <%= h.changeCase.pascal %>Schema = <%= h.changeCase.pascal %>Schema.fromEntity(entity)
      const raw<%= h.changeCase.pascal %> = await this.database.<%= h.changeCase.pascal %>.update({
        where: { id: <%= h.changeCase.pascal %>Schema.id, company_id: <%= h.changeCase.pascal %>Schema.company_id },
        data: <%= h.changeCase.pascal %>Schema
      });
      const entitySaved = <%= h.changeCase.pascal %>Schema.toEntity(raw<%= h.changeCase.pascal %>)
      return entitySaved
    } catch (error) {
      Logger.error("saving <%= h.changeCase.pascal %> failed", error);
      throw error;
    }
  }

  async getById(companyId: string, id: string): Promise<<%= h.changeCase.pascal %> | null> {
    try {
      const raw<%= h.changeCase.pascal %> = await this.database.<%= h.changeCase.pascal %>.findUnique({
        where: { id: Number(id), company_id: companyId },
      })
      if(!raw<%= h.changeCase.pascal %>) return null;
      const entitySaved = <%= h.changeCase.pascal %>Schema.toEntity(raw<%= h.changeCase.pascal %>)
      return entitySaved;
    } catch (error) {
      Logger.error("saving <%= h.changeCase.pascal %> failed", error);
      throw error;
    }
  }

  async list(companyId: string, skip: number, limit: number): Promise<<%= h.changeCase.pascal %>[]> {
    try {
      const raw<%= h.changeCase.pascal %>s = await this.database.<%= h.changeCase.pascal %>.findMany({
        where: { company_id: companyId },
        skip,
        take: limit,
      })
      if(!Array.isArray(raw<%= h.changeCase.pascal %>s) || raw<%= h.changeCase.pascal %>s.length === 0)
        return [];
      const entities = raw<%= h.changeCase.pascal %>s.map((data) => {
        const entity = <%= h.changeCase.pascal %>Schema.toEntity(data)
        return entity;
      })
      return entities;
    } catch (error) {
      Logger.error("get all <%= h.changeCase.pascal %> failed", error);
      throw error;
    }
  }

  async deleteById(companyId: string, id: string): Promise<<%= h.changeCase.pascal %> | null> {
    try {
       const raw<%= h.changeCase.pascal %> = await this.database.<%= h.changeCase.pascal %>.delete({
        where: { id: Number(id), company_id: companyId },
      })
       if(!raw<%= h.changeCase.pascal %>) return null;
       const entity = <%= h.changeCase.pascal %>Schema.toEntity(raw<%= h.changeCase.pascal %>)
       return entity;
    } catch (error) {
      Logger.error("deleting <%= h.changeCase.pascal %> failed", error);
      throw error;
    }
  }

}

