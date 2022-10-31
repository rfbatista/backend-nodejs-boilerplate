---
to: src/modules/<%= h.changeCase.snake(module) %>/entities/<%= h.changeCase.pascal(name) %>.ts
unless_exists: true
---
import { Entity } from "@shared/Entity";
import { Result } from "@shared/Result";

type Props = {
  companyId: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type <%= h.changeCase.pascal(name) %>Dto = {
  id: string;
  createdAt?: number;
  updatedAt?: number;
};

export default class <%= h.changeCase.pascal(name) %> extends Entity<Props> {

  static create(props: Props, id?: any) {
    return Result.ok(new <%= h.changeCase.pascal(name) %>(props, id));
  }

  get companyId(): string {
    return this.props.companyId
  }

  update(props: Partial<Props>) {
    for (const [key, value] of Object.entries(props)) {
      if (key === 'companyId') continue
      this.props = { ...this.props, ...{ [key]: value } }
    }
  }

  toDto(): <%= h.changeCase.pascal(name) %>Dto {
    return {
      id: this.id,
      createdAt: this.props?.createdAt?.getTime(),
      updatedAt: this.props?.updatedAt?.getTime()
    }
  }

}
