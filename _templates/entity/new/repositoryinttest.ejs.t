---
to: src/h.changeCase.snakes/<%= h.changeCase.snake %>/repositories/__tests__/<%= h.changeCase.pascal %>Repository.int.test.ts
unless_exists: true
---
import <%= h.changeCase.pascal %>Repository from "@h.changeCase.snakes/<%= h.changeCase.snake %>/repositories/<%= h.changeCase.pascal %>Repository";
import <%= h.changeCase.pascal %> from "@h.changeCase.snakes/<%= h.changeCase.snake %>/entities/<%= h.changeCase.pascal %>";
import Prisma from "@infrastructure/data_source/prisma";
import { createUniqueIdentifier, UniqueIdentifier } from "@shared/value_objects/UniqueIdentifier";
import Container from "typedi";

describe('<%= h.changeCase.pascal %>Repository', () => {

  const prisma = Container.get(Prisma);
  const repository = Container.get(<%= h.changeCase.pascal %>Repository);

  it('should should update <%= h.changeCase.pascal %>', async () => {
    const data = {
      id: createUniqueIdentifier(),
      company_id: 'test_01',
    }
    await prisma.<%= h.changeCase.pascal %>.create({
      data,
    })
    const <%= h.changeCase.pascal %> = <%= h.changeCase.pascal %>.create({ companyId: 'test_02' }, data.id).getValue()
    await repository.update(<%= h.changeCase.pascal %>)
    await expect(prisma.<%= h.changeCase.pascal %>.findUnique({
      where: {
        id: <%= h.changeCase.pascal %>.id,
      },
    })).resolves.toEqual({
      id: data.id,
      company_id: 'test_02'
    })
  })

  it('should delete <%= h.changeCase.pascal %>', async () => {
    const data = {
      id: createUniqueIdentifier(),
      company_id: 'test_01',
    }
    await prisma.<%= h.changeCase.pascal %>.create({
      data,
    })
    await repository.deleteById('test_01', data.id)
    await expect(prisma.<%= h.changeCase.pascal %>.findUnique({
      where: {
        id: data.id,
      },
    })).resolves.toEqual(null)
  })

  it('should list <%= h.changeCase.pascal %>', async () => {
    const generate  = (qtn: number) => {
      return Array.from(Array(qtn)).map(() => {
        return {
          id: createUniqueIdentifier(),
          company_id: 'test_01',
        }
      })
    }
    const items = generate(12);
    for (const data of items){
      await prisma.<%= h.changeCase.pascal %>.create({
        data,
      })
    }
    const itemsFound = await repository.list('test_01', 0, 12)
    await expect(prisma.<%= h.changeCase.pascal %>.findMany({
      where: {
        company_id: 'test_01'
      },
      skip: 0,
      take: 12,
    })).resolves.toHaveLength(itemsFound.length)
  })

  it('should get <%= h.changeCase.pascal %>', async () => {
    const data = {
      id: createUniqueIdentifier(),
      company_id: 'test_01',
    }
    await prisma.<%= h.changeCase.pascal %>.create({
      data,
    })
    const result = await repository.getById('test_01', data.id)
    if(!result) fail('<%= h.changeCase.pascal %> not found');
    expect(result.id).toEqual(data.id)
  })

  it('should create <%= h.changeCase.pascal %>', async () => {
    const <%= h.changeCase.pascal %> = <%= h.changeCase.pascal %>.create({ companyId: 'test_02' }).getValue()
    await repository.save(<%= h.changeCase.pascal %>)
    const result = await prisma.<%= h.changeCase.pascal %>.findUnique({
      where: {
        id: <%= h.changeCase.pascal %>.id,
      },
    })
    expect(result.id).toEqual(<%= h.changeCase.pascal %>.id)
  })
})
