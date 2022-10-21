import { Logger } from "@infrastructure/Logger";
import Container from "typedi";
import ContactRepository from "../repositories/contact-repo";
import CreateContactUseCase from "../use_cases/CreateContact";

const typeDefs = `
  scalar Date
  type Contact {
    firstName: String
    lastName: String
    jobTitle: String
    email: String
    address: String
    city: String
    street: String
    postalCode: String
    state: String
    country: String
    phone: String
    notes: String
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
  }

  type Query {
    contact: Contact
  }
`;

const resolvers = {
  Query: {
    contact: async (parent, args, context, info) => {
      const repo = Container.get(ContactRepository);
      const contact = await repo.getById(args.id);
      return contact;
    },
  },
  Mutation: {
    deleteContact: async (parent, args, context, info) => {
      const repo = Container.get(ContactRepository);
      try {
        await repo.deleteById(args.id);
      } catch (error) {
        Logger.error("delete contact failed", error);
      }
    },
    createContact: async (parent, args, context, info) => {
      const usecase = Container.get(CreateContactUseCase);
      const result = await usecase.execute(args)
      return result
    },
  },
};

export { resolvers as contactResolvers, typeDefs as contactSchema };
