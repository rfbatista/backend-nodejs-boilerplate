import { Logger } from "infrastructure/Logger";
import { Service } from "typedi";
import Contact from "../entities/contact";
import ContactModel from "./models/contact-model";

@Service()
export default class ContactRepository {
  public async exists(entity: Contact): Promise<boolean> {
    const result = await ContactModel.findOne({
      where: { id: entity.id.toString() },
    });
    return !!result === true;
  }

  async save(entity: Contact): Promise<any> {
    try {
      const model = ContactModel.fromEntity(entity);
      const savedModel = await model.save();
      return savedModel.toEntity();
    } catch (error) {
      Logger.error("saving contact", error);
      throw error;
    }
  }

  async getById(id: string): Promise<Contact> {
    try {
      const contact = await ContactModel.findByPk(id);
      if (!contact) return;
      return contact.toEntity();
    } catch (error) {
      Logger.error("saving contact", error);
      throw error;
    }
  }

  async deleteById(id: string): Promise<void> {
    try {
      await ContactModel.destroy({
        where: { id },
      });
    } catch (error) {
      Logger.error("saving contact", error);
      throw error;
    }
  }
}
